import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { ControlsPanelComponent } from './controls-panel/controls-panel.component';
import { HostDirective } from '../directive/host.directive';
import { UiComponentsModule } from '../ui-components/ui-components.module';



@NgModule({
  imports: [
    CommonModule,
    UiComponentsModule,
  ],
  declarations: [
    EditorComponent,
    ControlsPanelComponent,
    HostDirective,
  ],
  exports: [
    EditorComponent,
    ControlsPanelComponent
  ],
})
export class LayoutsModule { }
