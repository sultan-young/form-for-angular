import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  public value = 0;

  constructor() { }

  ngOnInit() {
  }

}
