import { NgModule } from "@angular/core";
import { BusService } from "./bus.service";
import { MouseService } from "./mouse.service";
import { Subject } from "rxjs";

@NgModule({
    providers: [
        BusService,
        MouseService,
    ]
})
export class CommonServiceModule {
    
}