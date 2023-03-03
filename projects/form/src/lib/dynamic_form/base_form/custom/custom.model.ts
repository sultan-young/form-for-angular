import { ForwardRefFn, TemplateRef, Type, forwardRef } from '@angular/core';
import {
  BaseModel,
  IBaseModelOption,
  ModelValue,
} from '../base.model';
import { ComponentInjector } from '../../decorator';
import { CustomComponent } from './custom.component';


// 组件特有属性
export interface CustomModelOption extends IBaseModelOption {
  forwardRef: ForwardRefFn;
  ngModelChange?: (value: any, model: DfCustomModel) => void;
}

@ComponentInjector(forwardRef(() => CustomComponent))
export class DfCustomModel extends BaseModel {
  static override createCustomModel: (options: CustomModelOption) => DfCustomModel;
  forwardRef!: ForwardRefFn;

  constructor(option: CustomModelOption) {
    super(option);
    this.initReplica(option);
    // TODO-README nzInputNumber 配置 https://ng.ant.design/components/input-number/zh#nz-input-number
    Object.assign(this, option);
  }
}
