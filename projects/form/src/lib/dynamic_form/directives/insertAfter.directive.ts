import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Directive({
  selector: '[dyInsertAfter]'
})
export class DyInsertAfterDirective{
  @Input() dyInsertAfter: string = ''

  constructor(public templateRef: TemplateRef<NzSafeAny>) {
  }



}
