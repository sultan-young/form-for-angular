import { EventEmitter, forwardRef } from "@angular/core";
import { NzDatePickerSizeType } from "ng-zorro-antd/date-picker";
import { ComponentInjector } from "../../decorator";
import { BaseModel, IBaseModelOption } from "../base.model";
import { DatePickerComponent } from "./datePicker.component";

type DatePickerMode = 'date' | 'week' | 'month';
type DatePickerType = 'normal' | 'range' | 'time';
type DateValueType = Date;
// 组件特有属性
export interface DfDatePickerModelOption extends Omit<IBaseModelOption, 'value'> {
  value: DateValueType | Array<DateValueType> | null;
  mode?: DatePickerMode;
  type?: DatePickerType;
  nzSize?: NzDatePickerSizeType;
  nzShowTime?: boolean;
  // 不可选择的日期
  nzDisabledDate?: (current: Date) => boolean;
  nzNowText?: string;
  // 弹出日历和关闭日历的回调
  nzOnOpenChange?: (open: boolean) => void;
  nzDisabledMinutes?: () => number[];
  nzFormat?: string;
  nzHideDisabledOptions?: boolean;
  ngModelChange?: (value: any, model: DfDatePickerModel) => void;
}

@ComponentInjector(forwardRef(() => DatePickerComponent))
export class DfDatePickerModel extends BaseModel {
  static override createCustomModel: (options: DfDatePickerModelOption) => DfDatePickerModel;

  mode = 'week';
  type = 'normal';
  nzFormat = '';
  nzHideDisabledOptions = false;
  nzNowText = '此刻';
  nzDisabledMinutes = () => [];
  nzShowTime = true;
  override nzSize: NzDatePickerSizeType = 'default';
  nzDisabledDate = (current: Date) => false;
  nzOnOpenChange = (open: boolean) => { };

  constructor(option: DfDatePickerModelOption) {
    super(option);
    this.initReplica(option);
    Object.assign(this, option);
  }

  // update(option: Partial<DfDatePickerModelOption>): void {
  // }

  // reset(): void {

  // }

}