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
import { fromEvent, switchMap } from 'rxjs';
import { MouseService } from '../../service/mouse.service';
import { v4 as uuid } from 'uuid';
import { ComponentMeta } from '../../../form.type';

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

    mouseEnter$.pipe().subscribe((event) => {
      this.mouseService.hooks.selectElement.next({
        uid: this.uid,
        host: hostEl,
        componentMeta: this.componentMeta,
      });
    });

    mouseLeave$.subscribe(_ => this.mouseService.hooks.cancelSelectElement.next({
      uid: this.uid,
      host: hostEl,
      componentMeta: this.componentMeta,
    }))
  }
}
