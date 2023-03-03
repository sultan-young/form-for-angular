import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { BaseModel, IBaseModelOption } from '../base.model';
import { ComponentInjector } from '../../decorator';
import { InputComponent } from './input.component';
import { forwardRef } from '@angular/core';
import { InputFormat } from '../../directives/InputFormat.directive';

type DfSelectModelOptionType = 'email' | 'password' | 'text';
interface NzInputGroup {
  nzSearch?: boolean;
}

// 组件特有属性
export interface DfInputModelOption extends IBaseModelOption {
  type?: DfSelectModelOptionType;
  nzSearch?: boolean;
  nzSize?: NzSizeLDSType;
  appInputFormat?: InputFormat;
  customRegRule?: RegExp;
  maxLength?: number;
  ngModelChange?: (value: any, model: DfInputModel) => void;
}

@ComponentInjector(forwardRef(() => InputComponent))
export class DfInputModel extends BaseModel {
  static override createCustomModel: (options: DfInputModelOption) => DfInputModel;

  public type?: DfSelectModelOptionType = 'text';
  nzSearch = false;
  override nzSize: NzSizeLDSType = 'default';
  appInputFormat!: InputFormat;
  customRegRule!: RegExp;
  maxLength!: number;

  constructor(option: DfInputModelOption) {
    super(option);
    this.initReplica(option);
    Object.assign(this, option);

    // TODO-README nzInputGroup 配置 https://ng.ant.design/components/input/zh#nz-input-group
  }
  // update(option: Partial<DfInputModelOption>): void {
  // }
  // reset(): void {

  // }
}
