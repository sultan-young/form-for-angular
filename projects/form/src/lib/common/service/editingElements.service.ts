import { Injectable } from "@angular/core";
import { RXElement } from "../../form.type";
import { MouseService } from "./mouse.service";

@Injectable()
export class EditingElementsService {
   private elements: RXElement[] = [];

    constructor(
        private mouseService: MouseService,
    ) {
        this.mouseService.hooks.selectElement.subscribe(element => {
            
        })
    }

    getElements() {
        return this.elements;
    }
}