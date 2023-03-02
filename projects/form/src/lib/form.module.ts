import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from './layouts/layouts.module';



@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutsModule,
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
