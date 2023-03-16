import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MouseService } from '../../service/mouse.service';
import { ComponentMeta } from '../../../form.type';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

const THUMBUP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;

@Component({
  selector: 'lib-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
})
export class SelectBoxComponent implements OnInit {
  @ViewChild('boxEl') boxEl!: ElementRef<HTMLDivElement>;
  public componentMeta!: ComponentMeta;

  public show = true;

  public style = {
    transform: 'translate(110px, 110px)',
    height: '30px',
    width: '200px',
  };

  constructor(
    private mouseService: MouseService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral(
      'thumbs-up',
      sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON)
    );
  }

  ngOnInit(): void {
    this.mouseService.hooks.selectElement.subscribe((selectElement) => {
      const { x, y, width, height } =
        selectElement.host.getBoundingClientRect();
      this.show = true;
      this.componentMeta = selectElement.componentMeta;
      this.setStyle({ x, y, width, height });
    });

    this.mouseService.hooks.cancelSelectElement.subscribe((selectElement) => {
      const { x, y, width, height } =
        selectElement.host.getBoundingClientRect();
      this.show = false;
    });
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
