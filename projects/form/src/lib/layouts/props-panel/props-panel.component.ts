import { Component, Input, OnInit } from '@angular/core';
import { RXElement } from '../../form.type';
import { MouseService } from '../../common/service/mouse.service';

@Component({
  selector: 'lib-props-panel',
  templateUrl: './props-panel.component.html',
  styleUrls: ['./props-panel.component.scss']
})
export class PropsPanelComponent implements OnInit {
  public rxElement!: RXElement;

  constructor(
    private mouseService: MouseService,
  ) { }

  ngOnInit(): void {
    this.mouseService.hooks.selectElement.subscribe((selectElement) => {
      // 当有新选中出现时候，如果不是自身选中则释放自己选中态
      this.rxElement = selectElement;
    });
  }

}
