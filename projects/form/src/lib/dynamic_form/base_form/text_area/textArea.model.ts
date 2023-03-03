import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import {BaseModel, IBaseModelOption} from '../base.model';
import { ComponentInjector } from '../../decorator';
import { TextAreaComponent } from './textArea.component';
import { forwardRef } from '@angular/core';
import { InputFormat } from '../../directives/InputFormat.directive';

// 组件特有属性
export interface DfTextAreaModelOption extends IBaseModelOption {
  nzSize?: NzSizeLDSType;
  rows?: number;
  nzMaxCharacterCount?: number;
  appInputFormat?: InputFormat;
  customRegRule?: RegExp;
  ngModelChange?: (value: any, model: DfTextAreaModel) => void;
}

@ComponentInjector(forwardRef(() => TextAreaComponent))
export class DfTextAreaModel extends BaseModel {
  static override createCustomModel: (options: DfTextAreaModelOption) => DfTextAreaModel;

  override nzSize: NzSizeLDSType = 'default';
  rows!: number;
  nzMaxCharacterCount!: number;
  appInputFormat!: InputFormat;
  customRegRule!: RegExp;

  constructor(option: DfTextAreaModelOption) {
    super(option);
    this.initReplica(option);
    Object.assign(this, option);

    // TODO-README nzInputGroup 配置 https://ng.ant.design/components/input/zh#nz-input-group
  }
  // update(option: Partial<DfTextAreaModelOption>): void {
  // }
  // reset(): void {

  // }
}
