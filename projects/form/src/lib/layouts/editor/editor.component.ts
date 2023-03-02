import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, tap, throttleTime } from 'rxjs';
import { HostDirective } from '../../common/directive/host.directive';
import { InputComponent } from '../../ui-components/input/input.component';
import { ControlRelationList } from '../controls-panel/controls.config';
import { ControlWrapComponent } from '../../common/components/control-wrap/control-wrap.component';


@Component({
  selector: 'lib-editors-panel',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild(HostDirective, {static: true}) host!: HostDirective;
  @ViewChild('editorContainerRef') editorContainerRef!: ElementRef<HTMLElement>

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // 标线
    let mark_line = document.querySelector('.mark-line') as HTMLDivElement;
    const editorContainerClientY = this.editorContainerRef.nativeElement.getBoundingClientRect().y;


    // 元素进入放置区域
    fromEvent(document.querySelector('.editor-main')!, 'dragenter').subscribe(event => {
      // console.log('event: dragenter', event);
      mark_line.style.display = 'block';
    })

    // 元素在放置区域内拖动
    fromEvent<DragEvent>(document.querySelector('.editor-main')!, 'dragover').pipe(
      tap(event => event.preventDefault()),
      throttleTime(30),
    ).subscribe(event => {
      console.log('event: ', event );
      // prevent default to allow drop
      // console.log('event: dragover', event);
      if (mark_line) {
        let offsetY = event.clientY - editorContainerClientY - 30;
        // 限制标线出容器
        offsetY = offsetY > 0 ? offsetY : 0;
        mark_line.style.transform = `translateY(${offsetY}px)`
      }
    })


    // 元素离开放置区域
    fromEvent<DragEvent>(document.querySelector('.editor-main')!, 'dragleave').subscribe(event => {
      // console.log('event: dragleave', event);
      
    });


    // 元素在放置区域内放下
    fromEvent<DragEvent>(document.querySelector('.editor-main')!, 'drop').subscribe(event => {
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
    const componentRef = viewContainerRef.createComponent<ControlWrapComponent>(ControlWrapComponent);
    componentRef.instance.component = component;
    // const componentRef1 = viewContainerRef.createComponent(component);
    // componentRef.instance.component = componentRef1;
  }
}
