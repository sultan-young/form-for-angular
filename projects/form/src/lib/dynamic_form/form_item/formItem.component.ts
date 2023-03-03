import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DfGroupModelOptionConfig } from '../types';
import { hasRequiredField, isFunction, isObject, isString, isTemplateRef } from '../utils/tools';
import { BaseModel, IBaseModelOption, IDescriptionTypeInfo } from '../base_form/base.model';

@Component({
  selector: 'dynamic-form-item',
  templateUrl: './formItem.component.html',
  styleUrls: ['./formItem.component.scss']
})
export class FormItemComponent implements OnInit, OnDestroy{

  @Input() model!: BaseModel;
  @Input() formConfig!: DfGroupModelOptionConfig;

  public isRequired = false;
  

  public isString = isString;
  public isObject = isObject;
  public isTemplateRef = isTemplateRef;
  private valueSubscription !: Subscription;
  private asyncValueSubscription !: Subscription;

  constructor() {
    
  }

  ngOnInit() {
    this.isRequired = hasRequiredField(this.model.control);
    // TODO: 这里之后会使用tapable出发hook，将所有迁移到baseModel里
    this.initListener();
  }

  // 初始化监听器
  private initListener() {
    this.initAsyncValueListener();
    this.initModelValueListener();
  }

   // 初始化model value监听器
   initModelValueListener() {
    const modelChange = this.model.ngModelChange;
    this.valueSubscription = this.model.control.valueChanges.subscribe((value) => {
      this.model.setValue(value, {
        emitEvent: false,
      });
      if (modelChange && isFunction(modelChange)) {
        modelChange.call(this, value, this);
      }
      if (this.model.valueChanges.length) {
        this.model.valueChanges.forEach((cb) => {
          cb.call(this, value, this);
        });
      }
    });
  }

  // 初始化异步value监听器，当前只支持BehaviorSubject
  initAsyncValueListener() {
    const initialValue = this.model.value;
    if (initialValue instanceof BehaviorSubject) {
      this.asyncValueSubscription = (initialValue as BehaviorSubject<any>).subscribe((value) => {
        this.model.setValue(value);
      });
    }
  }

  ngOnDestroy(): void {
    this.valueSubscription && (this.valueSubscription.unsubscribe());
    this.asyncValueSubscription && (this.asyncValueSubscription.unsubscribe());
  }

  get isInlineOrMultipleColumn(): boolean {
    return this.formConfig?.layout === 'inline' || (this.formConfig?.multipleColumn || 1) > 1;
  }

  // TODO: 这里由于脏检查机制，触发频率很高，后续考虑是否有优化空间
  getError = () => {
    if (typeof this.model.nzErrorTip === 'string') {
      return this.model.nzErrorTip;
    } else if (typeof this.model.nzErrorTip  === 'function') {
      return this.model.nzErrorTip(this.model.control.errors);
    }
    return '';
  }

  get descriptionInfo() {
    return this.model.description as IDescriptionTypeInfo;
  }

  get descriptionRef() {
    return this.model.description as TemplateRef<void>;
  }
}


