import { NgModule } from "@angular/core";
import { CommonComponentsModule } from "./components/components.module";
import { CommonDirectiveModule } from "./directive/directive.module";
import { CommonServiceModule } from "./service/commonService.module";

@NgModule({
    declarations: [

    ],
    imports: [
        CommonComponentsModule,
        CommonDirectiveModule,
        CommonServiceModule,
    ],
    exports: [
        CommonComponentsModule,
        CommonDirectiveModule,
    ]
})
export class AppCommonModule {

}