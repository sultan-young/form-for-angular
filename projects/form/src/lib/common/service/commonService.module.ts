import { NgModule } from "@angular/core";
import { BusService } from "./bus.service";
import { EditingElementsService } from "./editingElements.service";
import { HistoryService } from "./history.service";

@NgModule({
    providers: [
        BusService,
        EditingElementsService,
        HistoryService,
    ]
})
export class CommonServiceModule {
    
}