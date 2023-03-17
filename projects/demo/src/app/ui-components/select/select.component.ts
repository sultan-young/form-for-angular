import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  selectedValue = null;
  
  constructor() { }

  ngOnInit() {
  }

}
