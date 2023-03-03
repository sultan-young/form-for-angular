import {FormGroup} from '@angular/forms';
import {Component, Input} from '@angular/core';
import { DfRadioModel } from './radio.model';

@Component({
  selector: 'dynamic-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  @Input() model!: DfRadioModel;

  constructor() {

  }
}
