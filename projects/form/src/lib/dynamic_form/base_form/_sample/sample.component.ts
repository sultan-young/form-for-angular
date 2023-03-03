import {FormGroup} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {DfInputNumberModel} from '../input_number/inputNumber.model';

@Component({
  selector: 'dynamic-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
  @Input() model!: DfInputNumberModel;
  @Input() formGroup!: FormGroup;

  constructor() {

  }
}
