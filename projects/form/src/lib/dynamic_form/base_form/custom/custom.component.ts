import {FormGroup} from '@angular/forms';
import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, TemplateRef} from '@angular/core';
import { DfCustomModel } from './custom.model';

@Component({
  selector: 'dynamic-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements AfterViewInit {
  @Input() model!: DfCustomModel;

  public ref!: TemplateRef<any>;

  constructor() {
  }
  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.ref = this.model.forwardRef();
    })
  }
}
