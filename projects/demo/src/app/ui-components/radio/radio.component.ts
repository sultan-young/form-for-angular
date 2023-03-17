import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  radioValue = 'A';
  
  constructor() { }

  ngOnInit() {
  }

}
