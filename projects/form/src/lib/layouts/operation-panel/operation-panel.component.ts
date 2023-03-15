import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BusService } from '../../common/service/bus.service';

@Component({
  selector: 'lib-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.scss']
})
export class OperationPanelComponent implements OnInit {
  toppings = new FormControl('');

  constructor(
    private busService: BusService,
  ) { }

  ngOnInit(): void {
    this.toppings.valueChanges.subscribe(value => {
      console.log('value: ', value);
      this.busService.hooks.operationMessage.next({
        type: 'LayoutChange',
        payload: value,
      })
    })
  }

}
