import {BaseModel, IBaseModelOption} from '../base.model';
import { ComponentInjector } from '../../decorator';
import { SampleComponent } from './sample.component';
import { forwardRef } from '@angular/core';

// 组件特有属性
export interface SampleModelOption extends IBaseModelOption {
  ngModelChange?: (value: any, model: DynamicSampleModel) => void;
}

@ComponentInjector(forwardRef(() => SampleComponent))
export class DynamicSampleModel extends BaseModel {

  constructor(option: SampleModelOption) {
    super(option);
    this.initReplica(option);
    // TODO-README nzInputNumber 配置 https://ng.ant.design/components/input-number/zh#nz-input-number
    Object.assign(this, option)
  }

}