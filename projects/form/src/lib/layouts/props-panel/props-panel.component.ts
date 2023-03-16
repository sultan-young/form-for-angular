import { Component, Input, OnInit } from '@angular/core';
import { RXElement } from '../../form.type';

@Component({
  selector: 'lib-props-panel',
  templateUrl: './props-panel.component.html',
  styleUrls: ['./props-panel.component.scss']
})
export class PropsPanelComponent implements OnInit {
  @Input() instance!: RXElement;

  constructor() { }

  ngOnInit(): void {
  }

}
