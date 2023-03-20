import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MouseService } from '../../service/mouse.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { EditingElementsService } from '../../service/editingElements.service';
import { RxELementModel } from '../../../model/element.model';

const DELETE_ICON = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M106.666667 213.333333h810.666666v42.666667H106.666667z"  /><path fill="#ffffff" d="M640 128v42.666667h42.666667V128c0-23.573333-19.093333-42.666667-42.538667-42.666667H383.872A42.496 42.496 0 0 0 341.333333 128v42.666667h42.666667V128h256z"  /><path fill="#ffffff" d="M213.333333 896V256H170.666667v639.957333C170.666667 919.552 189.653333 938.666667 213.376 938.666667h597.248C834.218667 938.666667 853.333333 919.68 853.333333 895.957333V256h-42.666666v640H213.333333z"  /><path fill="#ffffff" d="M320 341.333333h42.666667v384h-42.666667zM490.666667 341.333333h42.666666v384h-42.666666zM661.333333 341.333333h42.666667v384h-42.666667z"  /></svg>`;
const MOVE_ICON = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M510.7 896.2c-15.3 0-28.7-11.3-31.4-26.6-0.7-4-0.6-7.9 0.1-11.7 1.7-43.3 0.6-444.5-0.6-710.7-0.1-17.5 14-31.7 31.5-31.8h0.1c17.4 0 31.6 14.1 31.7 31.5 0 0 0.8 179.3 1.3 358.7 0.2 89.7 0.3 179.4 0.2 246.8-0.3 141-0.3 141-30.2 143.7-0.9 0.1-1.8 0.1-2.7 0.1z"  /><path fill="#ffffff" d="M330.2 538.2h-65.5c-141-0.3-141-0.3-143.7-30.2-1.5-16.4 10.3-31.3 26.5-34.1 4-0.7 8-0.6 11.7 0.1 43.3 1.8 444.4 0.6 710.7-0.6h0.1c17.4 0 31.6 14.1 31.7 31.5 0.1 17.5-14 31.7-31.5 31.8 0 0-179.3 0.8-358.7 1.3-63 0.1-126 0.2-181.3 0.2zM614.8 250c-8.1 0-16.2-3.1-22.4-9.3L512 160.4l-80.4 80.4c-12.4 12.4-32.4 12.4-44.8 0-12.4-12.4-12.4-32.4 0-44.8L489.6 93.2c12.4-12.4 32.4-12.4 44.8 0L637.2 196c12.4 12.4 12.4 32.4 0 44.8-6.2 6.1-14.3 9.2-22.4 9.2zM512 920.5c-8.1 0-16.2-3.1-22.4-9.3L386.8 808.4c-12.4-12.4-12.4-32.4 0-44.8 12.4-12.4 32.4-12.4 44.8 0L512 844l80.4-80.4c12.4-12.4 32.4-12.4 44.8 0 12.4 12.4 12.4 32.4 0 44.8L534.4 911.2c-6.2 6.2-14.3 9.3-22.4 9.3z"  /><path fill="#ffffff" d="M795.8 636.6c-8.1 0-16.2-3.1-22.4-9.3-12.4-12.4-12.4-32.4 0-44.8l80.4-80.4-80.4-80.4c-12.4-12.4-12.4-32.4 0-44.8 12.4-12.4 32.4-12.4 44.8 0L921 479.8c12.4 12.4 12.4 32.4 0 44.8L818.2 627.4c-6.2 6.1-14.3 9.2-22.4 9.2zM228.2 636.6c-8.1 0-16.2-3.1-22.4-9.3L103 524.6c-12.4-12.4-12.4-32.4 0-44.8L205.8 377c12.4-12.4 32.4-12.4 44.8 0 12.4 12.4 12.4 32.4 0 44.8l-80.4 80.4 80.4 80.4c12.4 12.4 12.4 32.4 0 44.8-6.2 6.1-14.3 9.2-22.4 9.2z"  /></svg>`;
const COPY_ICON = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z"  /></svg>`;

enum Status {
  Hover,
  Selected,
  None,
}

@Component({
  selector: 'lib-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
})
export class SelectBoxComponent implements OnInit {
  @ViewChild('boxEl') boxEl!: ElementRef<HTMLDivElement>;
  @Input() destroySelf!: () => void;
  public rxElement!: RxELementModel;
  public Status = Status;
  public status$ = new BehaviorSubject<Status>(Status.None);
  public show = false;

  public style = {
    transform: 'translate(-px, 0px)',
    height: '30px',
    width: '200px',
    border: '1px dashed rgb(34, 183, 242)',
  };

  constructor(
    private mouseService: MouseService,
    private selfView: ViewContainerRef,
    private cd: ChangeDetectorRef,
    private editingElementsService: EditingElementsService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral(
      'lib-delete',
      sanitizer.bypassSecurityTrustHtml(DELETE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'lib-move',
      sanitizer.bypassSecurityTrustHtml(MOVE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'lib-copy',
      sanitizer.bypassSecurityTrustHtml(COPY_ICON)
    );
  }

  ngOnInit(): void {
    this.addListener();
    this.mouseService.hooks.hoverSelectElement.subscribe((selectElement) => {
      if (this.status$.value === Status.Selected) return;

      this.rxElement = selectElement;
      this.status$.next(Status.Hover);
      this.setPosition(selectElement.hostEl.getBoundingClientRect());
    });

    this.mouseService.hooks.leaveSelectElement.subscribe((selectElement) => {
      if (this.status$.value === Status.Selected) return;
      this.status$.next(Status.None);
    });

    this.mouseService.hooks.selectElement.subscribe((selectElement) => {
      // 当有新选中出现时候，如果不是自身选中则释放自己选中态
      if (this.rxElement && selectElement.uid !== this.rxElement.uid) {
        this.destroySelf();
        return;
      }
      if (!this.rxElement) return;
      this.rxElement = selectElement;
      // 监听元素位置变化
      merge(
        this.rxElement.hooks.positionChange,
        this.rxElement.hooks.sizeChange
      ).subscribe((rectInfo) => {
        this.setPosition(rectInfo);
        this.cd.detectChanges()
      });

      this.status$.next(Status.Selected);
    });

    this.mouseService.hooks.cancelSelectElement.subscribe((_) => {
      this.status$.next(Status.None);
      // 取消监听元素位置变化
    });
  }

  addListener() {
    this.addStatusListener();
  }

  // 监听选框状态
  addStatusListener() {
    this.status$.subscribe((status) => {
      let style = {
        ...this.style,
      };
      switch (true) {
        case status === Status.Selected:
          style.border = '2px solid rgb(34, 183, 242)';
          this.show = true;
          break;
        case status === Status.Hover:
          this.show = true;
          style.border = '1px dashed rgb(34, 183, 242)';
          break;
        case status === Status.None:
          this.show = false;
          break;
        default:
          break;
      }

      this.style = style;
    });
  }

  setPosition(rectInfo: { x: number; y: number; width: number; height: number }) {
    const { x, y, width, height } = rectInfo;
    this.style = {
      ...this.style,
      transform: `translate(${x}px, ${y}px)`,
      width: width + 'px',
      height: height + 'px',
    };
  }

  // 删除元素
  deleteElement() {
    if (!this.rxElement) return;
    this.editingElementsService.deleteElements(this.rxElement.uid);
  }
}
