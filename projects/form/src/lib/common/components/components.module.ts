import { NgModule } from "@angular/core";
import { ControlWrapComponent } from "./control-wrap/control-wrap.component";
import { CommonModule } from "@angular/common";
import { HostDirective } from "../directive/host.directive";
import { CommonDirectiveModule } from "../directive/directive.module";

@NgModule({
    imports: [
        CommonModule,
        CommonDirectiveModule,
    ],
    declarations: [
        ControlWrapComponent,
    ],
    exports: [
        ControlWrapComponent,
    ]
})
export class CommonComponentsModule {

}