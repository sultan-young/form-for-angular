import { Component, Input, OnInit } from '@angular/core';
import { RxELementModel } from '../../model/element.model';
import { elementHooks } from '../../common/hooks';

@Component({
  selector: 'lib-props-panel',
  templateUrl: './props-panel.component.html',
  styleUrls: ['./props-panel.component.scss']
})
export class PropsPanelComponent implements OnInit {
  public rxElement!: RxELementModel;

  constructor(
  ) { }

  ngOnInit(): void {
    elementHooks.selectElement.subscribe((selectElement) => {
      // 当有新选中出现时候，如果不是自身选中则释放自己选中态
      this.rxElement = selectElement;
    });
  }

}
