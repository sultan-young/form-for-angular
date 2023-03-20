import { Injectable } from '@angular/core';
import { MouseService } from './mouse.service';
import { fromEvent, map, mergeMap, switchMap, takeUntil } from 'rxjs';
import { HistoryService } from './history.service';
import { RxELementModel } from '../../model/element.model';

type uid = string;
interface ELementsObj {
  [uid: uid]: RxELementModel;
}

@Injectable()
export class EditingElementsService {
  private elementsProxy: ELementsObj = new Proxy<ELementsObj>({}, {
    set(target, propKey, newValue, receiver) {
      if (typeof propKey !== 'symbol') {
        target[propKey] = newValue;
        const rxElement = target[propKey];
        rxElement.onInit()
        return true;
      }
      return false;
    },
    deleteProperty(target, propKey) {
      if (target.hasOwnProperty(propKey) && typeof propKey !== 'symbol') {
        const rxElement = target[propKey];
        rxElement.onDestroy()
        delete target[propKey as any];
        return true;
      }
      return false;
    },
  });
  public hooks = {};

  constructor(
    private mouseService: MouseService,
    private historyService: HistoryService
  ) {}

  getElements() {
    return this.elementsProxy;
  }

  addElement(element: RxELementModel): number {
    this.elementsProxy[element.uid] = element;
    const hostEl = element.hostEl;
    const mouseEnter$ = fromEvent<MouseEvent>(hostEl, 'mouseenter');
    const mouseLeave$ = fromEvent<MouseEvent>(hostEl, 'mouseleave');
    const mouseClick$ = fromEvent<MouseEvent>(hostEl, 'click', {
      capture: true,
    });

    mouseEnter$.pipe().subscribe((event) => {
      this.mouseService.hooks.hoverSelectElement.next(element);
    });

    mouseLeave$.pipe().subscribe((_) => {
      this.mouseService.hooks.leaveSelectElement.next(element);
    });
    // 当选中元素后，元素不再响应 enter 和 leave事件，直到重新接受到 释放点击状态的事件
    mouseClick$.pipe().subscribe((event) => {
      event.stopPropagation();
      event.preventDefault();
      this.mouseService.hooks.selectElement.next(element);
    });
    // mergeMap(_ => this.mouseService.hooks.selectElement)
    return this.getSize();
  }

  deleteElements(uid: string): boolean {
    const rxElement = this.elementsProxy[uid];

    if (rxElement) {
      delete this.elementsProxy[rxElement.uid];
    }

    return !!rxElement;
  }

  getSize() {
    return Object.keys(this.elementsProxy).length;
  }
}
