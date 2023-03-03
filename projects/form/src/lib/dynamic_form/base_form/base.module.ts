import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../ngZorroAntd.module';
import { DynamicComponentPipeModule } from '../pipes/pipes.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CustomComponent } from './custom/custom.component';
import { DatePickerComponent } from './date_picker/datePicker.component';
import { InputComponent } from './input/input.component';
import { InputNumberComponent } from './input_number/inputNumber.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { SwitchComponent } from './switch/switch.component';
import { TreeSelectComponent } from './tree_select/tree_select.component';
import { TextAreaComponent } from './text_area/textArea.component';
import { DynamicComponentDirectiveModule } from '../directives/directives.module';


@NgModule({
  declarations: [
    InputComponent,
    InputNumberComponent,
    SelectComponent,
    DatePickerComponent,
    RadioComponent,
    SwitchComponent,
    CheckboxComponent,
    TreeSelectComponent,
    TextAreaComponent,
    CustomComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    DynamicComponentPipeModule,
    DynamicComponentDirectiveModule,
  ],
  providers: [
  ],
  exports: [
    DemoNgZorroAntdModule,
    InputComponent,
    InputNumberComponent,
    SelectComponent,
    DatePickerComponent,
    RadioComponent,
    SwitchComponent,
    CheckboxComponent,
    TextAreaComponent,
    CustomComponent,
    TreeSelectComponent,
  ],
})
export class BaseModelModule {

}
