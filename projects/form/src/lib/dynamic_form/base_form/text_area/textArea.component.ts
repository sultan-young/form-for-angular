import {Component, Input, OnInit} from '@angular/core';
import {DfTextAreaModel, DfTextAreaModelOption} from './textArea.model';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'dynamic-form-textarea',
  templateUrl: './textArea.component.html',
  styleUrls: ['./textArea.component.scss', '../../global/style.scss']
})
export class TextAreaComponent implements OnInit{
  @Input() model!: DfTextAreaModel;

  ngOnInit() {
  }
}
