import { Component, Input, OnInit } from '@angular/core';
import { DfTreeSelectModel } from './tree_select.model';

@Component({
  selector: 'dynamic-tree-select',
  templateUrl: './tree_select.component.html',
  styleUrls: ['./tree_select.component.scss']
})
export class TreeSelectComponent implements OnInit {
  @Input() model!: DfTreeSelectModel;

  ngOnInit(): void {
  }

  // get isTreeSelectGroup() {
  //   return !!this.model.nzOptionsGroup.length;
  // }
}
