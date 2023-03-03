import {Directive, ElementRef, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appDefaultText]'
})
export class DefaultTextDirective {

  constructor(
    private el: ElementRef,
  ) {
  }

  @Input() appDefaultText!: string | number | null | undefined;
  @HostBinding() get innerText(): string | number {
    return this.appDefaultText || this.appDefaultText === 0 ? this.appDefaultText : '-';
  }

}
