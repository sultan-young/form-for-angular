import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {DfSelectModel} from './select.model';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'dynamic-form-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit{
  @Input() model!: DfSelectModel;

  constructor() {
  }
  
  ngOnInit() {
    this.model.ngOnInit();
  }
}
