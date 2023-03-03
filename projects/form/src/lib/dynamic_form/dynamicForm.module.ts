import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DynamicFormComponent} from './dynamicForm.component';
import { DynamicComponentLoaderModule } from './dynamic_loader/dynamicComponentLoader.module';
import { BaseModelModule } from './base_form/base.module';
import { DynamicComponentDirectiveModule } from './directives/directives.module';
import { DynamicComponentPipeModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    DynamicFormComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DynamicComponentLoaderModule,
    BaseModelModule,
    DynamicComponentDirectiveModule,
    DynamicComponentPipeModule,
  ],
  providers: [
  ],
  exports: [
    DynamicFormComponent,
    BaseModelModule,
    DynamicComponentDirectiveModule,
    DynamicComponentLoaderModule,
    DynamicComponentPipeModule,
  ],
})
export class DynamicFormModuleV2 {

}
