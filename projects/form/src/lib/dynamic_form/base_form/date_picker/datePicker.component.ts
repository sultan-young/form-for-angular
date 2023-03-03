import { Component, Input, OnInit } from '@angular/core';
import { DfDatePickerModel } from './datePicker.model';

@Component({
  selector: 'dynamic-date-picker',
  templateUrl: './datePicker.component.html',
  styleUrls: ['./datePicker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() model!: DfDatePickerModel;

  constructor() { }

  ngOnInit() {
  }

}
