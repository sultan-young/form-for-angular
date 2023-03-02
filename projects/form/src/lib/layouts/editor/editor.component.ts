import { AfterContentInit, Component, OnInit, Type, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, tap, throttleTime } from 'rxjs';
import { HostDirective } from '../../directive/host.directive';
import { InputComponent } from '../../ui-components/input/input.component';
import { ControlRelationList } from '../controls-panel/controls.config';


@Component({
  selector: 'lib-editors-panel',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterContentInit {
  @ViewChild(HostDirective, {static: true}) host!: HostDirective;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterContentInit(): void {
    // 标线
    let mark_line = document.querySelector('.mark-line') as HTMLDivElement;


    // 元素进入放置区域
    fromEvent(document.querySelector('.editor-panel')!, 'dragenter').subscribe(event => {
      // console.log('event: dragenter', event);
      mark_line.style.display = 'block';
    })

    // 元素在放置区域内拖动
    fromEvent<DragEvent>(document.querySelector('.editor-panel')!, 'dragover').pipe(
      tap(event => event.preventDefault()),
      throttleTime(30),
    ).subscribe(event => {
      // prevent default to allow drop
      // console.log('event: dragover', event);
      if (mark_line) {
        mark_line.style.transform = `translateY(${event.offsetY - 20}px)`
      }
    })


    // 元素离开放置区域
    fromEvent<DragEvent>(document.querySelector('.editor-panel')!, 'dragleave').subscribe(event => {
      // console.log('event: dragleave', event);
      
    });


    // 元素在放置区域内放下
    fromEvent<DragEvent>(document.querySelector('.editor-panel')!, 'drop').subscribe(event => {
      // prevent default action (open as link for some elements)
      // event.preventDefault();
      const key = event.dataTransfer?.getData('control_key');
      const targetComponent = ControlRelationList.find(item => item.key === key)?.component;
      if (targetComponent) {
        this.appendComponent(targetComponent)
      }
      mark_line.style.display = 'none';
    })
  }

  appendComponent(component: Type<any>) {
    const viewContainerRef = this.host.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(component);
  }
}
