import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamic-loader-anchor]'
})
export class DynamicComponentLoaderDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
  ) {
   }

}
