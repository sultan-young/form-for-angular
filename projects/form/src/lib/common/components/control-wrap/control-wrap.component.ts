import { AfterViewInit, Component, ComponentRef, Input, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { HostDirective } from '../../directive/host.directive';

@Component({
  selector: 'lib-control-wrap',
  templateUrl: './control-wrap.component.html',
  styleUrls: ['./control-wrap.component.scss']
})
export class ControlWrapComponent implements OnInit, AfterViewInit {
  @ViewChild(HostDirective, {static: true}) host!: HostDirective;
  @Input() component!: Type<any>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const viewContainerRef = this.host.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(this.component);
  }

}
