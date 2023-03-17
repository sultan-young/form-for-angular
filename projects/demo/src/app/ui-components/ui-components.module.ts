import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzSelectModule,
    NzRadioModule,
  ],
  declarations: [
    CheckboxComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
  ],
  exports: [
    CheckboxComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    NzSelectModule,
  ],
})
export class UiComponentsModule { }
