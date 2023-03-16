import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() prop1 = 1;
  public value = 2;
  // NOTE: 在这里只需要以某种方式约定prop，之后再视图上呈现出来
  @Input() options = [];
  
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
