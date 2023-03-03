import {FormGroup} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {DfInputNumberModel} from './inputNumber.model';

@Component({
  selector: 'dynamic-form-input-number',
  templateUrl: './inputNumber.component.html',
  styleUrls: ['./inputNumber.component.scss']
})
export class InputNumberComponent {
  @Input() model!: DfInputNumberModel;

  constructor() {

  }
}
