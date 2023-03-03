import { TemplateRef, forwardRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzRadioButtonStyle } from 'ng-zorro-antd/radio';
import {BaseModel, IBaseModelOption} from '../base.model';
import { ComponentInjector } from '../../decorator';
import { RadioComponent } from './radio.component';

interface NzRadioOptionInterface {
  label: string | number | null | TemplateRef<NzSafeAny>;
  value: NzSafeAny | null;
  nzDisabled?: boolean;
}

// 组件特有属性
export interface IRadioOption extends IBaseModelOption {
  nzRadio: NzRadioOptionInterface[];
  mode?: 'normal' | 'button';
  nzButtonStyle?: NzRadioButtonStyle;
  ngModelChange?: (value: any, model: DfRadioModel) => void;
}

@ComponentInjector(forwardRef(() => RadioComponent))
export class DfRadioModel extends BaseModel {
  static override createCustomModel: (options: IRadioOption) => DfRadioModel;

  public nzRadio: NzRadioOptionInterface[] = [];
  public mode = 'normal';
  public nzButtonStyle :NzRadioButtonStyle = 'outline';

  constructor(option: IRadioOption) {
    super(option);
    this.initReplica(option);
    // TODO-README nzInputNumber 配置 https://ng.ant.design/components/input-number/zh#nz-input-number
    Object.assign(this, option)
  }

}
