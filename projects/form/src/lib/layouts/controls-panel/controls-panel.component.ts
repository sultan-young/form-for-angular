import { AfterViewInit, Component, Directive, ElementRef, Inject, InjectionToken, Injector, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { fromEvent } from 'rxjs';
import { LowFormModule} from '../../form.module';
import { COMPONENT_CONFIG_TOKEN } from '../../token';
import { ComponentMetaConfig } from '../../form.type';

const MK_URL_TOKEN = new InjectionToken<string>('markdown_sourceurl', {
  factory() {
      return "https://leaflet-f2e-test.hungrypanda.co:8887/markdownEditor";
  },
  providedIn: 'root'
});
let injector1 = Injector.create({
  providers: [{provide: MK_URL_TOKEN, useValue: 12312312 }]
})


@Component({
  selector: 'lib-controls-panel',
  templateUrl: './controls-panel.component.html',
  styleUrls: ['./controls-panel.component.scss'],
})
export class ControlsPanelComponent implements OnInit, AfterViewInit {
  @ViewChildren('controlRef') controls!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(
    @Inject(COMPONENT_CONFIG_TOKEN) public componentConfig: ComponentMetaConfig,
  ) {
  }

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
