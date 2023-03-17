import { NgModule } from "@angular/core";
import { HostDirective } from "./host.directive";
import { SelectBoxDirective } from "./select-box.directive";

@NgModule({
    declarations: [
        HostDirective,
        SelectBoxDirective,
    ],
    imports: [
    ],
    exports: [
        HostDirective,
        SelectBoxDirective,
    ]
})
export class CommonDirectiveModule {

}