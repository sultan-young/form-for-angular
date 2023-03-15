import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { ControlsPanelComponent } from './controls-panel/controls-panel.component';
import { AppCommonModule } from '../common/common.module';



@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
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
