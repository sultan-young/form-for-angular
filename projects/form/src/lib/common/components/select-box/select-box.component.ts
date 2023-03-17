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
import { RXElement } from '../../../form.type';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { BehaviorSubject, Observable } from 'rxjs';

const THUMBUP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;

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
  public rxElement!: RXElement;
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
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral(
      'thumbs-up',
      sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON)
    );
  }

  ngOnInit(): void {
    this.addListener()
    this.mouseService.hooks.hoverSelectElement.subscribe((selectElement) => {
      if (this.status$.value === Status.Selected) return;

      this.rxElement = selectElement;
      const { x, y, width, height } =
        selectElement.host.getBoundingClientRect();
      this.status$.next(Status.Hover)
      this.setStyle({ x, y, width, height });
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
      this.status$.next(Status.Selected);
    });

    this.mouseService.hooks.cancelSelectElement.subscribe(_ => {
      this.status$.next(Status.None);
    })
  }

  addListener() {
    this.addStatusListener();
  }

  // 监听选框状态
  addStatusListener() {
    this.status$.subscribe(status => {
      let style = {
        ...this.style,
      }
      switch (true) {
        case status === Status.Selected:
          style.border = '2px solid rgb(34, 183, 242)'
          this.show = true;
          break;
        case status === Status.Hover:
          this.show = true;
          style.border = '1px dashed rgb(34, 183, 242)'
          break;
        case status === Status.None:
          this.show = false;
          break;
        default:
          break;
      }

      this.style = style;
    })
  }

  setStyle(style: { x: number; y: number; width: number; height: number }) {
    const { x, y, width, height } = style;
    this.style = {
      ...this.style,
      transform: `translate(${x}px, ${y}px)`,
      width: width + 'px',
      height: height + 'px',
    };
  }
}
