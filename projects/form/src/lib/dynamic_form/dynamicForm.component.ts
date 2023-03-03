import {Component, ContentChild, ContentChildren, Input, OnChanges, QueryList, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {DfGroupModel} from './dynamicForm.model';
import { DyInsertAfterDirective } from './directives/insertAfter.directive';
import { DyInsertBeforeDirective } from './directives/insertBefore.directive';

@Component({
  selector: 'app-dynamic-form-v2',
  templateUrl: './dynamicForm.component.html',
  styleUrls: ['./dynamicForm.component.scss'],
})
export class DynamicFormComponent {
  @ContentChildren(DyInsertBeforeDirective) insertBeforeContentChildren !: QueryList<DyInsertBeforeDirective>
  @ContentChildren(DyInsertAfterDirective) insertAfterContentChildren !: QueryList<DyInsertAfterDirective>
  @Input() dynamicFormModel!: DfGroupModel;
  @Input() dfActions !: string | TemplateRef<void>

  constructor() {
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('%c 动态组件更新! ', 'background: #222; color: red')
  // }

  getTemplate(id: string, type: string): Array<TemplateRef<any>> {
    if (type === 'before') {
      return this.insertBeforeContentChildren.filter(item => item.dyInsertBefore === id).map(item => item.templateRef);
    }
    return this.insertAfterContentChildren.filter(item => item.dyInsertAfter === id).map(item => item.templateRef);
  }
  

  get multipleColumn(): number {
    const exp = 24 / this.dynamicFormModel.config?.multipleColumn! || 1;
    return exp;
  }

  get isMultipleColumn(): boolean {
    const exp = 24 / this.dynamicFormModel.config?.multipleColumn! || 1;
    // console.log(':', exp);
    return exp !== 24;
  }

  get visibleDynamicFormModel() {
    return this.dynamicFormModel.group.filter(item => item.visible);
  }

}
