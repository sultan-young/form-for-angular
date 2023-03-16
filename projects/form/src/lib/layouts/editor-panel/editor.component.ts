import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, tap, throttleTime } from 'rxjs';
import { HostDirective } from '../../common/directive/host.directive';
import { ControlWrapComponent } from '../../common/components/control-wrap/control-wrap.component';
import { COMPONENT_CONFIG_TOKEN } from '../../token';
import { ComponentMetaConfig } from '../../form.type';
import { BusService } from '../../common/service/bus.service';
import { EditingElementsService } from '../../common/service/editingElements.service';


const MARK_LINE_OFFSET = 30;
let markLineFinallyY = 0;
let insert_index = 0;
@Component({
  selector: 'lib-editors-panel',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild(HostDirective, {static: true}) host!: HostDirective;
  @ViewChild('editorContainerRef') editorContainerRef!: ElementRef<HTMLElement>
  public direction: 'Horizontal' | 'Vertical' = 'Horizontal'

  constructor(
    @Inject(COMPONENT_CONFIG_TOKEN) public componentConfig: ComponentMetaConfig,
    private cd: ChangeDetectorRef,
    public busService: BusService,
    public editingElementsService: EditingElementsService,
  ) {
  }

  ngOnInit(): void {
    this.busService.hooks.operationMessage.subscribe(action => {
      if (action.type === 'LayoutChange') {
        this.direction = action.payload === 'Horizontal' ? 'Horizontal' : 'Vertical';
      }
      
    })
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
      // 真实的位置像上偏移30px，防止遮挡视野
      const mouseOffsetY = event.clientY - MARK_LINE_OFFSET;
      // 标线的真实位置还需要减去容器到顶部的距离
      let markLineOffsetY = mouseOffsetY - editorContainerClientY;
      markLineOffsetY = markLineOffsetY > 0 ? markLineOffsetY : 0;

      // 当前鼠标所在位置控件
      let targetEl;
      let targetELIndex = 0;
      
      for (let i = 0; i < nodeList.length; i++) {
        let elRect = nodeList[i].getBoundingClientRect();
        const { y, height } = elRect;
        // 鼠标在某个控件之间
        if (mouseOffsetY > y && mouseOffsetY < y + height) {
          targetEl = nodeList[i];
          targetELIndex = i;
          break;
        }
      };
      
      if (targetEl) {
        const { y, height } = targetEl.getBoundingClientRect();
        const TargetElMiddleLineY = y + (height / 2);
        if (mouseOffsetY < TargetElMiddleLineY) {
          markLineFinallyY = y - editorContainerClientY;
          insert_index = targetELIndex;
          console.log('上边');
        } else {
          markLineFinallyY = y - editorContainerClientY + height;
          insert_index = targetELIndex + 1;
          console.log('下边');
        }
      }

      // prevent default to allow drop
      // console.log('event: dragover', event);
      if (mark_line) {
        // 限制标线出容器
        mark_line.style.transform = `translateY(${markLineFinallyY}px)`
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
      
      if (!key) return;

      this.appendComponent(key)
      mark_line.style.display = 'none';
    })
  }

  appendComponent(key: string) {
    const target = this.componentConfig.find(item => item.key === key);
    if (!target) return;

    const viewContainerRef = this.host.viewContainerRef;
    const componentRef = viewContainerRef.createComponent<ControlWrapComponent>(ControlWrapComponent);
    componentRef.instance.componentMeta = target;
    this.cd.detectChanges();
  }
}
