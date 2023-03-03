import { NgModule } from '@angular/core';
import { DynamicComponentLoaderComponent } from './dynamicComponentLoader.component';
import { DynamicComponentLoaderDirective } from './dynamicCOmponentLoader.directive';
import { FormItemComponent } from '../form_item/formItem.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormItemModule } from '../form_item/formItem.module';

@NgModule({
  imports: [
    FormItemModule,
  ],
  declarations: [	
    DynamicComponentLoaderComponent,
    DynamicComponentLoaderDirective,
  ],
  providers: [
  ],
  exports: [
    DynamicComponentLoaderComponent,
  ]
})
export class DynamicComponentLoaderModule { }
