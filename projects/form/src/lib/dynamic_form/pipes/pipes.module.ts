import { NgModule } from "@angular/core";
import { PeelBehaviorSubjectPipe } from "./peelBehaviorSubject.pipe";

@NgModule({
    declarations: [
        PeelBehaviorSubjectPipe,
    ],
    exports: [
        PeelBehaviorSubjectPipe,
    ]
})
export class DynamicComponentPipeModule {

}