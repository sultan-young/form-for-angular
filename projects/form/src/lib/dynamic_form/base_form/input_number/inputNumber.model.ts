import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import {BaseModel, IBaseModelOption} from '../base.model';
import { ComponentInjector } from '../../decorator';
import { InputNumberComponent } from './inputNumber.component';
import { forwardRef } from '@angular/core';
import { InputFormat } from '../../directives/InputFormat.directive';


// 组件特有属性
export interface DfInputNumberModelOption extends IBaseModelOption {
  nzMax?: number | undefined;
  nzMin?: number | undefined;
  nzPrecision?: number | undefined;
  nzStep?: number;
  nzPlaceHolder?: string;
  nzSize?: NzSizeLDSType;
  appInputFormat?: InputFormat;
  customRegRule?: RegExp;
  nzPrecisionMode?: 'cut' | 'toFixed' | ((value: number | string, precision?: number) => number);
  nzFormatter?: (value: number) => string | number;
  nzParser?: (value: string) => string;
  ngModelChange?: (value: any, model: DfInputNumberModel) => void;
}

// 默认属性常量
const NZ_STEP_PROPERTY = 1;
const NZ_FORMATTER_HANDLE = (value: number | string) => value;
const NZ_PARSER_HANDLE = (value: string) => value.trim().replace(/。/g, '.').replace(/[^\w\.-]+/g, '');

@ComponentInjector(forwardRef(() => InputNumberComponent))
export class DfInputNumberModel extends BaseModel {
  static override createCustomModel: (options: DfInputNumberModelOption) => DfInputNumberModel;

  nzMax = Infinity;
  nzMin = -Infinity;
  nzPrecision = undefined;
  nzStep = NZ_STEP_PROPERTY;
  nzPlaceHolder = '';
  nzFormatter = NZ_FORMATTER_HANDLE;
  nzParser = NZ_PARSER_HANDLE;
  override nzSize: NzSizeLDSType = 'default';
  appInputFormat!: InputFormat;
  customRegRule!: RegExp;
  nzPrecisionMode: 'cut' | 'toFixed' | ((value: number | string, precision?: number) => number) = 'toFixed'


  constructor(option: DfInputNumberModelOption) {
    super(option);

    this.initReplica(option);
    // TODO-README nzInputNumber 配置 https://ng.ant.design/components/input-number/zh#nz-input-number
    Object.assign(this, option)
  }
  // update(option: Partial<DfInputNumberModelOption>): void {
  // }
  // reset(): void {
    
  // }
}
