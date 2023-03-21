import { ComponentRef, Directive, OnInit, ViewContainerRef } from '@angular/core';
import { SelectBoxComponent, SelectBoxMode } from '../components/select-box/select-box.component';
import { distinctUntilKeyChanged, startWith } from 'rxjs';
import { RxELementModel } from '../../model/element.model';
import { elementHooks } from '../hooks';

@Directive({
  selector: '[select-box]',
})
export class SelectBoxDirective implements OnInit{
  public lastSelectedBox!: SelectBoxComponent;

  constructor(
    private viewContainerRef: ViewContainerRef,
    ) { 
  }
  ngOnInit(): void {
    
    // 当有选中元素的时候，新增一个选中框
    elementHooks.selectElement.pipe(
        startWith(null),
    ).subscribe(rxElement => {
        this.createSelectBox(rxElement ? SelectBoxMode.Selected : SelectBoxMode.Hover, rxElement)
    })
  }

  createSelectBox(mode: SelectBoxMode, element: RxELementModel | null) {
    const newSelectBox = this.viewContainerRef.createComponent(SelectBoxComponent);
    newSelectBox.instance.destroySelf = newSelectBox.destroy.bind(newSelectBox);
    newSelectBox.instance.mode = mode;
    if (mode === SelectBoxMode.Selected) {
      newSelectBox.instance.selectedElement = element;
    };
    // if (mode === SelectBoxMode.Selected && this.lastSelectedBox) {
    //   this.lastSelectedBox.destroySelf();
    // }
    // if (mode === SelectBoxMode.Selected) {
    //   this.lastSelectedBox = newSelectBox.instance;
    // }
  }
}