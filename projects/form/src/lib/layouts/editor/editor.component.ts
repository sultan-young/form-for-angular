import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, tap, throttleTime } from 'rxjs';
import { HostDirective } from '../../common/directive/host.directive';
import { InputComponent } from '../../ui-components/input/input.component';
import { ControlRelationList } from '../controls-panel/controls.config';
import { ControlWrapComponent } from '../../common/components/control-wrap/control-wrap.component';
import { DfCheckboxModel, DfGroupModel, DfInputModel, DfRadioModel, DfSelectModel, DfSwitchModel, DfTextAreaModel } from '../../dynamic_form';
import { v4 as uuid } from 'uuid'


const MARK_LINE_OFFSET = 0;
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

  constructor() { }

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
      const nodeList = Array.from(editorContainerEL.querySelectorAll('dynamic-loader'));

      // 真实的位置像上便宜30px，防止遮挡视野
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
      if (mark_line) {
        // 限制标线出容器
        mark_line.style.transform = `translateY(${markLineFinallyY}px)`;
      }
    })


    // 元素离开放置区域
    fromEvent<DragEvent>(document.querySelector('.editor-main')!, 'dragleave').subscribe(event => {
      // console.log('event: dragleave', event);
      
    });


    // 元素在放置区域内放下
    fromEvent<DragEvent>(document.querySelector('.editor-main')!, 'drop').subscribe(event => {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      const key = event.dataTransfer?.getData('control_key');

      // 动态表单方式
      const targetModel = ControlRelationList.find(item => item.key === key)?.dynamicModel as any;
      if (targetModel) {
        this.myFormModel.setModel(new targetModel({
          id: uuid(),
          label: 'asdf',
        }))
      }

      // 纯ui方式
      // const targetComponent = ControlRelationList.find(item => item.key === key)?.component;
      // if (targetComponent) {
      //   this.appendComponent(targetComponent, insert_index)
      // }
      mark_line.style.display = 'none';
    })
  }

  appendComponent(component: Type<any>, index: number) {
    const viewContainerRef = this.host.viewContainerRef;
    const componentRef = viewContainerRef.createComponent<ControlWrapComponent>(ControlWrapComponent, {
      index,
    });
    componentRef.instance.component = component;
    // const componentRef1 = viewContainerRef.createComponent(component);
    // componentRef.instance.component = componentRef1;
  }

  myFormModel = new DfGroupModel([
      // new DfInputModel({
      //   id: 'input',
      //   label: '输入框',
      //   value: '123'
      // }),
      // new DfSwitchModel({
      //   id: 'switch1',
      //   label: '开关1',
      //   value: true,
      // }),
      // new DfSwitchModel({
      //   id: 'switch2',
      //   label: '开关2',
      //   value: true,
      // }),
      // new DfRadioModel({
      //   id: 'radio',
      //   label: '性别',
      //   nzRadio: [
      //     {
      //       label: '男',
      //       value: 1,
      //     },
      //     {
      //       label: '女',
      //       value: 0,
      //     }
      //   ],
      //   description: '当switch1和switch2同时打开时候展示',
      //   listeners: [
      //     // 使用set语法糖解决大多数场景
      //     {
      //       watch: ['switch1', 'switch2'],
      //       when: (switch1Value, switch2Value) => {
      //         return !!switch1Value && !!switch2Value;
      //       },
      //       set: {
      //         disabled: [true, false],
      //       },
            
      //     },
      //     // 使用do， otherwise解决边界场景
      //     {
      //       watch: ['input'],
      //       when: (inputValue) => {
      //         return inputValue == '123';
      //       },
      //     do(self) {
      //         console.log('%c 满足条件','color: green;')
      //         self.description = '满足条件';
      //       },
      //       otherwise(self) {
      //         console.log('%c 不满足条件','color: red;')
      //         self.description = '不满足条件';
      //       }
      //     }
      //   ]
      // }),
      // new DfSelectModel({
      //   id: 'select',
      //   label: '城市',
      //   nzOptions: [
      //     {
      //       label: '杭州',
      //       value: 'hangzhou'
      //     },
      //     {
      //       label: '南京',
      //       value: 'nanjing'
      //     }
      //   ],
      //   listeners: [
      //     {
      //       watch: ['radio'],
      //       when: (radioValue) => radioValue === 1,
      //       set: {
      //         disabled: [true, false]
      //       }
      //     }
      //   ]
      // }),
      // new DfTextAreaModel({
      //   id: 'textArea',
      //   label: '备注',
      //   visible: false,
      //   listeners: [
      //     {
      //       watch: ['select'],
      //       when: (selectValue) => selectValue === 'nanjing',
      //       set: {
      //         visible: [true, false]
      //       }
      //     }
      //   ]
      // })
    ],
  {
    layout: 'horizontal',
    style: {
      width: '600px',
    }
  })
  title = 'demo';
}
