import { Injectable } from "@angular/core";
import { RXElement } from "../../form.type";
import { MouseService } from "./mouse.service";
import { fromEvent, map, mergeMap, switchMap, takeUntil } from 'rxjs';

@Injectable()
export class EditingElementsService {
   private elements: RXElement[] = [];
   public hooks = {}

    constructor(
        private mouseService: MouseService,
    ) {
        const { selectElement, cancelSelectElement } = this.mouseService.hooks;
        selectElement.subscribe(selectedElement => {
            this.elements.push(selectedElement)
        });
        cancelSelectElement.subscribe(selectElement => {
            this.elements = this.elements.filter(element => element.uid !== selectElement.uid);
        });
    }

    getElements() {
        return this.elements;
    }

    pushElements(element: RXElement): number {
        this.elements.push(element);

        const hostEl = element.host;
        const mouseEnter$ = fromEvent<MouseEvent>(hostEl, 'mouseenter');
        const mouseLeave$ = fromEvent<MouseEvent>(hostEl, 'mouseleave');
        const mouseClick$ = fromEvent<MouseEvent>(hostEl, 'click');
    
        let isSelected = false;
    
        mouseEnter$.pipe(
        ).subscribe((event) => {
          this.mouseService.hooks.hoverSelectElement.next(element);
        });
    
        mouseLeave$.pipe(
        ).subscribe(_ => {
          this.mouseService.hooks.leaveSelectElement.next(element)
        })
    
        // 当选中元素后，元素不再响应 enter 和 leave事件，直到重新接受到 释放点击状态的事件
        mouseClick$.pipe(
        ).subscribe(_ => {
          this.mouseService.hooks.selectElement.next(element);
        })
        // mergeMap(_ => this.mouseService.hooks.selectElement)
        return this.elements.length;
    }

    getSize() {
        return this.elements.length;
    }
}