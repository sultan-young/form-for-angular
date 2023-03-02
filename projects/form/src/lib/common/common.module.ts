import { NgModule } from "@angular/core";
import { CommonComponentsModule } from "./components/components.module";
import { CommonDirectiveModule } from "./directive/directive.module";

@NgModule({
    declarations: [

    ],
    imports: [
        CommonComponentsModule,
        CommonDirectiveModule,
    ],
    exports: [
        CommonComponentsModule,
        CommonDirectiveModule,
    ]
})
export class AppCommonModule {

}