import { AfterContentInit, Component, OnInit } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'lib-editors-panel',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    // 标线
    let mark_line = document.querySelector('.mark-line') as HTMLDivElement;


    // 元素进入放置区域
    fromEvent(document.querySelector('.editor-panel')!, 'dragenter').subscribe(event => {
      console.log('event: dragenter', event);
      mark_line.style.display = 'block';
    })

    // 元素在放置区域内拖动
    fromEvent<DragEvent>(document.querySelector('.editor-panel')!, 'dragover').pipe(
      throttleTime(30),
    ).subscribe(event => {
      // prevent default to allow drop
      // event.preventDefault();
      // console.log('event: dragover', event);
      if (mark_line) {
        mark_line.style.transform = `translateY(${event.offsetY - 20}px)`
      }
    })
    // 元素离开放置区域
    fromEvent<DragEvent>(document.querySelector('.editor-panel')!, 'dragleave').subscribe(event => {
      // console.log('event: dragleave', event);
      mark_line.style.display = 'none';
    });
    // 元素在放置区域内放下
    fromEvent(document.querySelector('.editor-panel')!, 'drop').subscribe(event => {
      // prevent default action (open as link for some elements)
      // event.preventDefault();
      // console.log('event: drop', event);
    })
  }

}
