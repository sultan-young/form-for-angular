import { NgModule } from "@angular/core";
import { DyInsertAfterDirective } from "./insertAfter.directive";
import { DyInsertBeforeDirective } from "./insertBefore.directive";
import { NzStringTemplateOutletDirective } from "./string_template_outlet.directive";
import { InputFormatDirective } from "./InputFormat.directive";
import { DefaultTextDirective } from "./defaultText.directive";

@NgModule({
    declarations: [
        NzStringTemplateOutletDirective,
        DyInsertAfterDirective,
        DyInsertBeforeDirective,
        InputFormatDirective,
        DefaultTextDirective
    ],
    exports: [
        NzStringTemplateOutletDirective,
        DyInsertAfterDirective,
        DyInsertBeforeDirective,
        InputFormatDirective,
        DefaultTextDirective,
    ]
})
export class DynamicComponentDirectiveModule {

}