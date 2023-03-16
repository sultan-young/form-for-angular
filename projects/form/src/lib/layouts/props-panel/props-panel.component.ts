import { Component, Input, OnInit } from '@angular/core';
import { ComponentInstance } from '../../form.type';

@Component({
  selector: 'lib-props-panel',
  templateUrl: './props-panel.component.html',
  styleUrls: ['./props-panel.component.scss']
})
export class PropsPanelComponent implements OnInit {
  @Input() instance!: ComponentInstance;

  constructor() { }

  ngOnInit(): void {
  }

}
