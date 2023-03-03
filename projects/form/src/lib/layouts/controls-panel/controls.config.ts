import { DfCheckboxModel, DfInputModel, DfRadioModel, DfSelectModel } from '../../dynamic_form';
import { CheckboxComponent } from '../../ui-components/checkbox/checkbox.component';
import { InputComponent } from '../../ui-components/input/input.component';
import { RadioComponent } from '../../ui-components/radio/radio.component';
import { SelectComponent } from '../../ui-components/select/select.component';

// export const ControlRelationList = [
//     {
//       name: '多选框',
//       key: 'checkout',
//       component: CheckboxComponent,
//     },
//     {
//       name: '输入框',
//       key: 'input',
//       component: InputComponent,
//     },
//     {
//       name: '单选框',
//       key: 'radio',
//       component: RadioComponent,
//     },
//     {
//       name: '下拉框',
//       key: 'select',
//       component: SelectComponent,
//     }
//   ]

export const ControlRelationList = [
  {
    name: '多选框',
    key: 'checkout',
    dynamicModel: DfCheckboxModel,
  },
  {
    name: '输入框',
    key: 'input',
    dynamicModel: DfInputModel,
  },
  {
    name: '单选框',
    key: 'radio',
    dynamicModel: DfRadioModel,
  },
  {
    name: '下拉框',
    key: 'select',
    dynamicModel: DfSelectModel,
  }
]