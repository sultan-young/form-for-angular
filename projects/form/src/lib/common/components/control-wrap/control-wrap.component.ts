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
import { ComponentMeta } from '../../../form.type';

@Component({
  selector: 'lib-control-wrap',
  templateUrl: './control-wrap.component.html',
  styleUrls: ['./control-wrap.component.scss'],
})
export class ControlWrapComponent implements OnInit, AfterViewInit {
  @ViewChild(HostDirective, { static: true }) host!: HostDirective;
  @Input() componentMeta!: ComponentMeta;

  constructor(
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const viewContainerRef = this.host.viewContainerRef;
    console.log('this.componentMeta.component: ', this.componentMeta);
    const componentRef = viewContainerRef.createComponent(this.componentMeta.component);
  }
}