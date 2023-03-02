import { AfterViewInit, Component, OnInit } from '@angular/core';
import { fromEvent, throttle, throttleTime } from 'rxjs';


@Component({
  selector: 'lib-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {


    
  }

  onDrop(event: Event) {
    event.preventDefault()
    console.log(event, 'onDrop');
  }
  onDragover(event: Event) {
    event.preventDefault()
    console.log(event, 'onDragover');
  }
}
