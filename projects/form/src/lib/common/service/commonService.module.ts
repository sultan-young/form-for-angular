import { NgModule } from "@angular/core";
import { BusService } from "./bus.service";
import { MouseService } from "./mouse.service";
import { EditingElementsService } from "./editingElements.service";
import { HistoryService } from "./history.service";

@NgModule({
    providers: [
        BusService,
        MouseService,
        EditingElementsService,
        HistoryService,
    ]
})
export class CommonServiceModule {
    
}