import { ComponentRef, Type } from '@angular/core';
import {
  Observable,
  Subject,
  auditTime,
  filter,
  fromEvent,
  map,
  reduce,
  scan,
  shareReplay,
  tap,
} from 'rxjs';
import { v4 as uuid } from 'uuid';
import { elementHooks, globalHooks } from '../common/hooks';

interface ElementHooks {
  positionChange: Observable<DOMRect>;
  sizeChange: Observable<DOMRect>;
  onHover: Observable<RxELementModel>;
  onLeave: Observable<RxELementModel>;
  onSelect: Observable<RxELementModel>;
  onCancelSelect: Observable<RxELementModel>;
  onDelete: Observable<RxELementModel>;
  onMove: Observable<RxELementModel>;
  onCopy: Observable<RxELementModel>;
}

export interface RxElementOption {
  componentRef: ComponentRef<unknown>;
  name: string;
  key: string;
}

export class RxELementModel {
  public uid!: string;
  public name: string = '匿名控件';
  public key!: string;
  private componentRef!: ComponentRef<unknown>;
  props?: {
    [prop: string]: unknown;
  };

  public hooks!: ElementHooks;

  constructor(options: RxElementOption) {
    this.uid = uuid();
    this.componentRef = options.componentRef;
    this.name = options.name;
    this.key = options.key;
  }

  onInit() {
    this.initHooks();
    this.listenSizeChange();
  }

  initHooks() {
    this.hooks = {
      // 元素位置变化
      positionChange: globalHooks.windowResize.pipe(
        auditTime(60),
        map((_) => this.hostEl.getBoundingClientRect())
      ),
      // 元素尺寸变化
      sizeChange: new Observable<DOMRect>(),
      // 元素被hover
      onHover: fromEvent<MouseEvent>(this.hostEl, 'mouseenter').pipe(
        map((_) => this)
      ),
      // 元素取消hover
      onLeave: fromEvent<MouseEvent>(this.hostEl, 'mouseleave').pipe(
        map((_) => this)
      ),
      // 元素被选中
      onSelect: fromEvent<MouseEvent>(this.hostEl, 'click').pipe(
        shareReplay(1),
        map((_) => this)
      ),
      // 元素取消选中
      onCancelSelect: elementHooks.selectElement.pipe(
        filter(element => element.uid !== this.uid),
        map((_) => this)
      ),
      // 元素删除
      onDelete: new Subject(),
      // 元素移动
      onMove: new Subject(),
      // 元素被复制
      onCopy: new Subject(),
    };
    this.hooks.onHover.subscribe((model) => {
      elementHooks.hoverSelectElement.next(model);
    });
    this.hooks.onLeave.subscribe((model) => {
      elementHooks.leaveSelectElement.next(model);
    });
    this.hooks.onSelect.subscribe((model) => {
      console.log('元素选中');
      elementHooks.selectElement.next(model);
    });
    this.hooks.onCancelSelect.subscribe((_) => {
      console.log('元素取消选中');
    });
  }

  onDestroy() {
    if (!this.componentRef) {
      throw Error('componentRef 不存在');
    }
    this.componentRef.destroy();
    // TODO: 如果自身被选中，则将选中状态清除
  }

  // 选中触发
  onSelected() {}

  // 尺寸变化
  listenSizeChange() {
    this.hooks.sizeChange = new Observable<DOMRect>((observer) => {
      const resizeObserver = new ResizeObserver((entries) => {
        observer.next(entries[0].target.getBoundingClientRect());
      });
      resizeObserver.observe(this.hostEl);
    }).pipe(auditTime(60));
  }

  get hostEl(): HTMLElement {
    return this.componentRef?.location.nativeElement;
  }
}
