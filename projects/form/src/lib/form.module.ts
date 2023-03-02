import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { UiComponentsModule } from './ui-components/ui-components.module';
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
    UiComponentsModule,
    LayoutsModule,
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
