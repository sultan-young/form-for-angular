import {FormGroup} from '@angular/forms';
import {Component, Input} from '@angular/core';
import { SwitchModelOption } from './switch.model';

@Component({
  selector: 'dynamic-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  @Input() model!: SwitchModelOption;

  constructor() {

  }
}
