import { InjectionToken, Injector, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { FormComponent } from './form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from './layouts/layouts.module';
import { ComponentMetaConfig } from './form.type';
import { COMPONENT_CONFIG_TOKEN } from './token';

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
export class LowFormModule { 
  // 想实现的效果是传过来的组件配置可以直接在low form中使用
  static forRoot(componentMetaConfig: ComponentMetaConfig): ModuleWithProviders<LowFormModule> {
    
    return {
      ngModule: LowFormModule,
      providers: [{
        provide: COMPONENT_CONFIG_TOKEN,
        useValue: componentMetaConfig,
      }]
    }
  }
}
