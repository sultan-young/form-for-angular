import { AfterViewInit, Component, Directive, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ControlRelationList } from './controls.config';


@Component({
  selector: 'lib-controls-panel',
  templateUrl: './controls-panel.component.html',
  styleUrls: ['./controls-panel.component.scss']
})
export class ControlsPanelComponent implements OnInit, AfterViewInit {
  @ViewChildren('controlRef') controls!: QueryList<ElementRef<HTMLDivElement>>;
  public controlRelationList = ControlRelationList;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const elementsRef = this.controls.toArray().map(controlRef => controlRef.nativeElement);
    // 开始拖动
    fromEvent<DragEvent>(elementsRef, 'dragstart').subscribe(event => {
      const key = (event.target as HTMLElement)?.getAttribute('key') || '';
      event.dataTransfer!.effectAllowed = 'move';
      event.dataTransfer?.setData('control_key', key)
      // console.log(event, 'dragstart');
    })
    // 拖动进行中
    fromEvent(elementsRef, 'drag').subscribe(event => {
      // console.log(event, 'drag');
    })
    // 拖动结束
    fromEvent(elementsRef, 'dragend').subscribe(event => {
      // console.log(event, 'dragend');
    })
  }

}
