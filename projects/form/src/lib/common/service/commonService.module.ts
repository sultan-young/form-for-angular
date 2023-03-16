import { NgModule } from "@angular/core";
import { BusService } from "./bus.service";
import { MouseService } from "./mouse.service";
import { EditingElementsService } from "./editingElements.service";

@NgModule({
    providers: [
        BusService,
        MouseService,
        EditingElementsService,
    ]
})
export class CommonServiceModule {
    
}