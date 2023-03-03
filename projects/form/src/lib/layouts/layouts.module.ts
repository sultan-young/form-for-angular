import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { ControlsPanelComponent } from './controls-panel/controls-panel.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { AppCommonModule } from '../common/common.module';
import { DynamicFormModuleV2 } from '../dynamic_form';



@NgModule({
  imports: [
    CommonModule,
    UiComponentsModule,
    AppCommonModule,
    DynamicFormModuleV2,
  ],
  declarations: [
    EditorComponent,
    ControlsPanelComponent,
  ],
  exports: [
    EditorComponent,
    ControlsPanelComponent
  ],
})
export class LayoutsModule { }
