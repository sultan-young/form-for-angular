import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { HostDirective } from '../../directive/host.directive';
import { fromEvent, map, mergeMap, switchMap, takeUntil } from 'rxjs';
import { MouseService } from '../../service/mouse.service';
import { v4 as uuid } from 'uuid';
import { ComponentMeta, RXElement } from '../../../form.type';

@Component({
  selector: 'lib-control-wrap',
  templateUrl: './control-wrap.component.html',
  styleUrls: ['./control-wrap.component.scss'],
})
export class ControlWrapComponent implements OnInit, AfterViewInit {
  @ViewChild(HostDirective, { static: true }) host!: HostDirective;
  @Input() componentMeta!: ComponentMeta;

  public uid = uuid();

  constructor(
    private hostViewContainer: ViewContainerRef,
    private mouseService: MouseService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const viewContainerRef = this.host.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(this.componentMeta.component);
    console.log('componentRef: ', viewContainerRef);
    
    const hostEl = this.hostViewContainer.element.nativeElement;
    const mouseEnter$ = fromEvent<MouseEvent>(hostEl, 'mouseenter');
    const mouseLeave$ = fromEvent<MouseEvent>(hostEl, 'mouseleave');
    const mouseClick$ = fromEvent<MouseEvent>(hostEl, 'click');

    const payload = {
      ...this.componentMeta,
      uid: this.uid,
      host: hostEl,
    }

    let isSelected = false;

    mouseEnter$.pipe(
    ).subscribe((event) => {
      if (isSelected) return;
      this.mouseService.hooks.hoverSelectElement.next(payload);
    });

    mouseLeave$.pipe(
    ).subscribe(_ => {
      console.log('组件离开');
      if (isSelected) return;
      this.mouseService.hooks.cancelSelectElement.next(payload)
    })

    // 当选中元素后，元素不再响应 enter 和 leave事件，直到重新接受到 释放点击状态的事件
    mouseClick$.pipe(
    ).subscribe(_ => {
      isSelected = true;
      this.mouseService.hooks.selectElement.next(payload);
    })
    // mergeMap(_ => this.mouseService.hooks.selectElement)

    this.mouseService.hooks.selectElement.subscribe(element => {
      if (element.uid !== this.uid) {
        isSelected = false;
        console.log('选中的不是自己，应该释放掉选中态')
      }
    })
  }
}