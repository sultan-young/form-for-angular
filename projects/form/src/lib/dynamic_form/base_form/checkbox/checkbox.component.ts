import {FormGroup} from '@angular/forms';
import {Component, Input} from '@angular/core';
import { DfCheckboxModel } from './checkbox.model';
@Component({
  selector: 'dynamic-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() model!: DfCheckboxModel;

  constructor() {

  }
}
