import { NzSizeDSType } from 'ng-zorro-antd/core/types';
import {BaseModel, IBaseModelOption} from '../base.model';
import { ComponentInjector } from '../../decorator';
import { SwitchComponent } from './switch.component';
import { forwardRef } from '@angular/core';

// 组件特有属性
export interface SwitchModelOption extends IBaseModelOption {
  nzSize?: NzSizeDSType;
  nzLoading?: boolean;
  value: boolean;
  ngModelChange?: (value: any, model: DfSwitchModel) => void;
}

@ComponentInjector(forwardRef(() => SwitchComponent))
export class DfSwitchModel extends BaseModel {
  static override createCustomModel: (options: SwitchModelOption) => DfSwitchModel;

  nzLoading = false;
  override nzSize: NzSizeDSType = 'default';

  constructor(option: SwitchModelOption) {
    super(option);
    this.initReplica(option);
    // TODO-README nzInputNumber 配置 https://ng.ant.design/components/input-number/zh#nz-input-number
    Object.assign(this, option)
  }

}
