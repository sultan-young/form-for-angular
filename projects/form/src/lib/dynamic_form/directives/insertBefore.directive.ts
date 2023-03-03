import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dyInsertBefore]'
})
export class DyInsertBeforeDirective{
  @Input() dyInsertBefore: string = ''

  constructor(public templateRef: TemplateRef<any>) {
    
  }



}
