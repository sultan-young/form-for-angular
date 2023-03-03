import {Component, Input, OnInit} from '@angular/core';
import { DfInputModel } from './input.model';

@Component({
  selector: 'dynamic-form-input',
  templateUrl: './input.component.html',
  styleUrls: ['../../global/style.scss']
})
export class InputComponent implements OnInit{
  @Input() model!: DfInputModel;

  ngOnInit() {
  }
}
