import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { ControlsPanelComponent } from './controls-panel/controls-panel.component';
import { AppCommonModule } from '../common/common.module';
import { OperationPanelComponent } from './operation-panel/operation-panel.component';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  exports: [
    EditorComponent,
    ControlsPanelComponent,
    OperationPanelComponent,
  ],
})
export class LayoutsModule { }
