import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, Type, ViewChild } from '@angular/core';
import { BaseModel } from '../base_form/base.model';
import { DfGroupModelOptionConfig } from '../types';
import { DfGroupModel } from '../dynamicForm.model';
import { DynamicComponentLoaderDirective } from './dynamicCOmponentLoader.directive';

@Component({
  selector: 'dynamic-loader',
  templateUrl: './dynamicComponentLoader.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DynamicComponentLoaderComponent implements OnInit, AfterViewInit {
  @ViewChild(DynamicComponentLoaderDirective) dynamicAnchor!: DynamicComponentLoaderDirective;
  // 组件Model
  @Input() model !: BaseModel;
  @Input() formConfig !: DfGroupModelOptionConfig;
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }
  loadComponent() {
    const component = this.getDynamicComponentByModel(this.model)
    if (!component) return;
    // TODO: 从 v13 开始，通过ViewContainerRef.createComponent创建动态组件不需要解析组件工厂：组件类可以直接使用。
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    let viewContainerRef = this.dynamicAnchor.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance).model = this.model;
    // 主动触发变更检测周期
    this.cd.detectChanges()
  }

  public getDynamicComponentByModel(model: BaseModel): Type<any> {
    // TIPS: 这里必须讲Component inject到实例中，因为不同实例最终注入的可能不同
    const component = (model as any)._component;
    if (!component) {
      throw new Error('Not inject the corresponding component');
    }
    return component;
  }
}
