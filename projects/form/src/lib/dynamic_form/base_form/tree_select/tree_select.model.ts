import {
    BaseModel,
    IBaseModelOption,
} from '../base.model';
import { ComponentInjector } from '../../decorator';
import { TreeSelectComponent } from './tree_select.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { XOR } from '../../utils/xor';
import { DfFormItemModelSet } from '../../types';
import { Type, forwardRef } from '@angular/core';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzSelectModeType } from 'ng-zorro-antd/select/select.types';

export interface DfTreeSelectOptionInterface {
    label: string | number | null;
    value: NzSafeAny | null;
    disabled?: boolean;
    hide?: boolean;
}

type NzTreeSelectGroupOptionInterface = {
    label: string;
    nzOption: DfTreeSelectOptionInterface[];
};

export interface DfTreeSelectModelOptionNormal
    extends DfTreeSelectModelOptionBase {
    nzOptions?: DfTreeSelectOptionInterface[];
}

export interface DfTreeSelectModelOptionGroup
    extends DfTreeSelectModelOptionBase {
    nzOptionsGroup?: NzTreeSelectGroupOptionInterface[];
}

// 组件特有属性
export interface DfTreeSelectModelOptionBase extends IBaseModelOption {
    nzAllowClear?: boolean;
    nzDisabled?: boolean;
    nzShowIcon?: boolean; // 是否展示 TreeNode title 前的图标，没有默认样式
    nzShowSearch?: boolean;
    nzMultiple?: boolean;   // 是否支持多选
    nzCheckable?: boolean;
    nzShowExpand?: boolean;
    nzShowLine?: boolean;
    nzAsyncData?: boolean;
    nzDefaultExpandAll?: boolean;
    nzVirtualHeight?: string;
    nzNodes: NzTreeNodeOptions[];
    nzExpandedKeys?: string; // 默认展开指定的树节点
    nzMaxTagCount?: number; // 最多显示多个tag
}

export type DfTreeSelectModelOption = XOR<
    DfTreeSelectModelOptionNormal,
    DfTreeSelectModelOptionGroup
>;

@ComponentInjector(forwardRef(() => TreeSelectComponent))
export class DfTreeSelectModel extends BaseModel {
    static override createCustomModel: (options: DfTreeSelectModelOption, model?: Type<any>) => DfTreeSelectModel;
    nzMode: NzSelectModeType = 'default';
    nzAllowClear = true;
    nzDisabled = false;
    nzShowIcon = false; // 是否展示 TreeNode title 前的图标，没有默认样式
    nzShowSearch = false;
    nzMultiple = true;   // 是否支持多选
    nzCheckable = false;
    nzShowExpand = true;
    nzShowLine = false;
    nzAsyncData = false;
    nzVirtualHeight = '300px';
    nzDefaultExpandAll = false;
    nzNodes = [];
    nzExpandedKeys = ''; // 默认展开指定的树节点
    nzMaxTagCount = 3; // 最多显示多个tag

    constructor(option: DfTreeSelectModelOption) {
        super(option);
        this.initReplica(option);
        Object.assign(this, option);
        this.initValue();
    }



    // 当tree为多选模式时候, 初始值必须为数组，否则会报错
    initValue(): void {
        if (
            (this.nzMode === 'multiple' || this.nzMode === 'tags') &&
            !Array.isArray(this.value)
        ) {
            this.value = [];
            this.setValue([]);
        }
    }

    override update<T extends DfFormItemModelSet>(option: Partial<T>): void {
        Object.assign(this, option);
        if (option.hasOwnProperty('value')) {
            // TIPS: 当为select并同时修改nzMode和value时候，会引发ng-zorro的一个bug
            if (option.hasOwnProperty('nzMode')) {
                setTimeout(() => {
                    this.setValue(option.value);
                }, 0);
            } else {
                this.setValue(option.value);
            }
        }
    }

}
