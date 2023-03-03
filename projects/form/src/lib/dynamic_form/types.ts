import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { DfCustomModel, DfTextAreaModel } from './base_form';
import { ModelValue } from './base_form/base.model';
import { DfCheckboxModel, CheckboxModelOption } from './base_form/checkbox/checkbox.model';
import { DfDatePickerModel, DfDatePickerModelOption } from './base_form/date_picker/datePicker.model';
import { DfInputModel, DfInputModelOption } from './base_form/input/input.model';
import { DfInputNumberModel, DfInputNumberModelOption } from './base_form/input_number/inputNumber.model';
import { DfRadioModel, IRadioOption } from './base_form/radio/radio.model';
import { DfSelectModel, DfSelectModelOptionNormal, DfSelectModelOptionGroup } from './base_form/select/select.model';
import { DfSwitchModel, SwitchModelOption } from './base_form/switch/switch.model';
import { DfTreeSelectModel, DfTreeSelectModelOptionNormal, DfTreeSelectModelOptionGroup } from './base_form/tree_select/tree_select.model';

export type DfFormItemModelSet =
  | DfDatePickerModel
  | DfInputModel
  | DfInputNumberModel
  | DfRadioModel
  | DfSelectModel
  | DfSwitchModel
  | DfCheckboxModel
  | DfTreeSelectModel
  | DfTextAreaModel
  | DfCustomModel


export type DfFormItemModelSetOption =
  | CheckboxModelOptionType
  | DfDatePickerModelOptionType
  | DfInputModelOptionType
  | DfInputNumberModelOptionType
  | IRadioOptionType
  | DfSelectModelOptionNormalType
  | DfSelectModelOptionGroupType
  | SwitchModelOptionType
  | DfSelectModelOptionGroupType
  | DfSelectModelOptionNormalType
export type DfFormItemModelSetPartialOption = Partial<DfFormItemModelSetOption>


interface CheckboxModelOptionType extends CheckboxModelOption {
  UnitType?: DfFormEnum.CheckBox
}

interface DfDatePickerModelOptionType extends DfDatePickerModelOption {
  UnitType: DfFormEnum.DatePicker
}

interface DfInputModelOptionType extends DfInputModelOption {
  UnitType: DfFormEnum.Input
}

interface DfInputNumberModelOptionType extends DfInputNumberModelOption {
  UnitType: DfFormEnum.InputNumber
}

interface IRadioOptionType extends IRadioOption {
  UnitType: DfFormEnum.Radio
}

interface DfSelectModelOptionNormalType extends DfSelectModelOptionNormal {
  UnitType?: DfFormEnum.Select
}

interface DfSelectModelOptionGroupType extends DfSelectModelOptionGroup {
  UnitType: DfFormEnum.Select
}

interface DfTreeSelectModelOptionNormalType extends DfTreeSelectModelOptionNormal {
  UnitType?: DfFormEnum.TreeSelect
}

interface DfTreeSelectModelOptionGroupType extends DfTreeSelectModelOptionGroup {
  UnitType: DfFormEnum.TreeSelect
}


interface SwitchModelOptionType extends SwitchModelOption {
  UnitType: DfFormEnum.Switch
}


export const enum DfFormEnum {
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  CheckBox,
  TreeSelect
}

export type OptionalDfFormItemModelSet = Partial<DfFormItemModelSet>;

export type PatchUpdateOptionParams = {
  [props: string]: DfFormItemModelSetPartialOption;
};

export type PatchUpdateValueParams = {
  [props: string]: ModelValue;
};

type DfGroupModelGroupItem =
  | DfInputModel
  | DfSelectModel
  | DfInputNumberModel
  | DfDatePickerModel;

export { DfGroupModelGroupItem };

export interface DfGroupModelOptionConfig {
  multipleColumn?: number | 1;
  layout?: NzFormLayoutType;
  nzLabelSpan?: number;
  nzControlSpan?: number;
  style?: {
    [props: string]: string;
  };
}


export interface IUpdateValue {
  onlySelf?: boolean;
  emitEvent?: boolean;
  emitModelToViewChange?: boolean;
  emitViewToModelChange?: boolean;
}
