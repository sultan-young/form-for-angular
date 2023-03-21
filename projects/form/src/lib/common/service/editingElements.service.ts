import { Injectable } from '@angular/core';
import { elementHooks } from '../hooks';
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

  constructor(
    private historyService: HistoryService
  ) {}

  getElements() {
    return this.elementsProxy;
  }

  addElement(element: RxELementModel): number {
    this.elementsProxy[element.uid] = element;
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
