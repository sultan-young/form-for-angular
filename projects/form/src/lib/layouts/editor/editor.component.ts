import { AfterContentInit, AfterViewInit, Component, ElementRef, Inject, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, tap, throttleTime } from 'rxjs';
import { HostDirective } from '../../common/directive/host.directive';
import { ControlWrapComponent } from '../../common/components/control-wrap/control-wrap.component';
import { COMPONENT_CONFIG_TOKEN } from '../../token';
import { InjectComponentConfig } from '../../form.type';


const MARK_LINE_OFFSET = 30;

@Component({
  selector: 'lib-editors-panel',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild(HostDirective, {static: true}) host!: HostDirective;
  @ViewChild('editorContainerRef') editorContainerRef!: ElementRef<HTMLElement>

  constructor(
    @Inject(COMPONENT_CONFIG_TOKEN) public componentConfig: InjectComponentConfig,
  ) {
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    // 标线
    let mark_line = document.querySelector('.mark-line') as HTMLDivElement;
    const editorContainerEL = this.editorContainerRef.nativeElement;
    const editorContainerClientY = editorContainerEL.getBoundingClientRect().y;

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
      const nodeList = Array.from(editorContainerEL.querySelectorAll('lib-control-wrap'));

      // 真实的位置像上便宜30px，防止遮挡视野
      const mouseOffsetY = event.clientY - MARK_LINE_OFFSET;
      // 标线的真实位置还需要减去容器到顶部的距离
      let markLineOffsetY = mouseOffsetY - editorContainerClientY;
      markLineOffsetY = markLineOffsetY > 0 ? markLineOffsetY : 0;

      // 当前鼠标所在位置控件
      let targetEl;
      for (let i = 0; i < nodeList.length; i++) {
        let elRect = nodeList[i].getBoundingClientRect();
        const { y, height } = elRect;
        // 鼠标在某个控件之间
        if (mouseOffsetY > y && mouseOffsetY < y + height) {
          targetEl = nodeList[i];
          break;
        }
      }
      console.log('event: ',  targetEl );
      // prevent default to allow drop
      // console.log('event: dragover', event);
      if (mark_line) {
        // 限制标线出容器
        mark_line.style.transform = `translateY(${markLineOffsetY}px)`
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


      const targetComponent = this.componentConfig.find(item => item.key === key)?.component;
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
