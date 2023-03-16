import { NgModule } from "@angular/core";
import { ControlWrapComponent } from "./control-wrap/control-wrap.component";
import { CommonModule } from "@angular/common";
import { HostDirective } from "../directive/host.directive";
import { CommonDirectiveModule } from "../directive/directive.module";
import { SelectBoxComponent } from './select-box/select-box.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectiveModule,
        MatIconModule,
    ],
    declarations: [
        ControlWrapComponent,
        SelectBoxComponent,
    ],
    exports: [
        ControlWrapComponent,
        SelectBoxComponent,
    ]
})
export class CommonComponentsModule {

}