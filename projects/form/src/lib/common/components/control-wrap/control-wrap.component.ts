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

  constructor(
    private hostViewContainer: ViewContainerRef,
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const viewContainerRef = this.host.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(this.componentMeta.component);
    
  }
}