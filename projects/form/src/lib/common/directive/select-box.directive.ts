import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { SelectBoxComponent } from '../components/select-box/select-box.component';
import { MouseService } from '../service/mouse.service';
import { distinctUntilKeyChanged, startWith } from 'rxjs';
import { RxELementModel } from '../../model/element.model';

@Directive({
  selector: '[select-box]',
})
export class SelectBoxDirective implements OnInit{
  constructor(
    private viewContainerRef: ViewContainerRef,
    private mouseService: MouseService,
    ) { 
  }
  ngOnInit(): void {
    
    // 当有选中元素的时候，新增一个选中框
    this.mouseService.hooks.selectElement.pipe(
        distinctUntilKeyChanged<RxELementModel>('uid'),
        startWith(null),
    ).subscribe(rxElement => {
        this.createSelectBox()
    })
  }

  createSelectBox() {
    const newSelectBox = this.viewContainerRef.createComponent(SelectBoxComponent);
    newSelectBox.instance.destroySelf = newSelectBox.destroy.bind(newSelectBox);
  }
}