import { AfterContentInit, Component, OnInit } from '@angular/core';
import { CheckboxComponent } from '../../ui-components/checkbox/checkbox.component';
import { InputComponent } from '../../ui-components/input/input.component';
import { RadioComponent } from '../../ui-components/radio/radio.component';
import { SelectComponent } from '../../ui-components/select/select.component';
import { fromEvent } from 'rxjs';



const Controls = [
  {
    name: '多选框',
    component: CheckboxComponent,
  },
  {
    name: '输入框',
    component: InputComponent,
  },
  {
    name: '单选框',
    component: RadioComponent,
  },
  {
    name: '下拉框',
    component: SelectComponent,
  }
]

@Component({
  selector: 'lib-controls-panel',
  templateUrl: './controls-panel.component.html',
  styleUrls: ['./controls-panel.component.scss']
})
export class ControlsPanelComponent implements OnInit, AfterContentInit {
  public controls = Controls;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    // 开始拖动
    fromEvent(document.querySelectorAll('div[draggable=true]'), 'dragstart').subscribe(event => {
      // console.log(event, 'dragstart');
    })
    // 拖动进行中
    fromEvent(document.querySelectorAll('div[draggable=true]'), 'drag').subscribe(event => {
      // console.log(event, 'drag');
    })
    // 拖动结束
    fromEvent(document.querySelectorAll('div[draggable=true]'), 'dragend').subscribe(event => {
      // console.log(event, 'dragend');
    })
  }

}
