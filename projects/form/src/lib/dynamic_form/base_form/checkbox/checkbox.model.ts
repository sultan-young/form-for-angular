import {
  BaseModel,
  IBaseModelOption,
  ModelValue,
} from '../base.model';
import { ComponentInjector } from '../../decorator';
import { CheckboxComponent } from './checkbox.component';
import { forwardRef } from '@angular/core';

export type ICheckboxValueList = Array<{
  label: string;
  value: ModelValue;
  disabled?: boolean;
  checked?: boolean;
}>;

// 组件特有属性
export interface CheckboxModelOption extends IBaseModelOption {
  value?: ICheckboxValueList;
  ngModelChange?: (value: any, model: DfCheckboxModel) => void;
}

@ComponentInjector(forwardRef(() => CheckboxComponent))
export class DfCheckboxModel extends BaseModel {
  static override createCustomModel: (options: CheckboxModelOption) => DfCheckboxModel;
  public _value: ICheckboxValueList = [];
  
  constructor(option: CheckboxModelOption) {
    super(option);
    this.initReplica(option);
    // TODO-README nzInputNumber 配置 https://ng.ant.design/components/input-number/zh#nz-input-number
    Object.assign(this, option);
  }
}
