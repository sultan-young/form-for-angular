import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor-panel/editor.component';
import { ControlsPanelComponent } from './controls-panel/controls-panel.component';
import { AppCommonModule } from '../common/common.module';
import { OperationPanelComponent } from './operation-panel/operation-panel.component';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropsPanelComponent } from './props-panel/props-panel.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
    MatSelectModule,
  ],
  declarations: [
    EditorComponent,
    ControlsPanelComponent,
    OperationPanelComponent,
    PropsPanelComponent,
  ],
  exports: [
    EditorComponent,
    ControlsPanelComponent,
    OperationPanelComponent,
    PropsPanelComponent,
  ],
})
export class LayoutsModule { }
