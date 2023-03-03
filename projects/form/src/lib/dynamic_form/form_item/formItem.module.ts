import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DynamicComponentDirectiveModule } from '../directives/directives.module';
import { FormItemComponent } from './formItem.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
@NgModule({
  imports: [
    CommonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzToolTipModule,
    DynamicComponentDirectiveModule,
    NzSpinModule,
  ],
  declarations: [FormItemComponent],
  providers: [],
  exports: [FormItemComponent],
})
export class FormItemModule {}
