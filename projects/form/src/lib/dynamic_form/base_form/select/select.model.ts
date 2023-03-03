import {
  BaseModel,
  IBaseModelOption,
} from '../base.model';
import { NzSelectModeType } from 'ng-zorro-antd/select/select.types';
import { ComponentInjector } from '../../decorator';
import { SelectComponent } from './select.component';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { XOR } from '../../utils/xor';
import { DfFormItemModelSet } from '../../types';
import { OnInit, Type, forwardRef } from '@angular/core';
import { isFunction } from '../../utils/tools';
import { BehaviorSubject } from 'rxjs';

export interface DfSelectOptionInterface {
  label: string | number | null;
  value: NzSafeAny | null;
  disabled?: boolean;
  hide?: boolean;
}

export type NzSelectGroupOptionInterface = {
  label: string;
  nzOption: DfSelectOptionInterface[];
};

export interface DfSelectModelOptionNormal
  extends DfSelectModelOptionBase {
  nzOptions?: DfSelectOptionInterface[] | BehaviorSubject<DfSelectOptionInterface[]>;
}

export interface DfSelectModelOptionGroup
  extends DfSelectModelOptionBase {
  nzOptionsGroup?: NzSelectGroupOptionInterface[] | BehaviorSubject<NzSelectGroupOptionInterface[]>;
}

// 组件特有属性
export interface DfSelectModelOptionBase extends IBaseModelOption {
  nzMode?: NzSelectModeType;
  nzAllowClear?: boolean;
  nzMaxMultipleCount?: number;
  nzMaxTagCount?: number;
  nzPlaceHolder?: string;
  nzMaxTagPlaceholder?: string;
  nzShowArrow?: boolean;
  nzShowSearch?: boolean;
  nzSize?: NzSelectSizeType;
  // 支持异步加载的option
  nzOptionsAsync?: (() => Promise<DfSelectOptionInterface[]>) | null;
  ngModelChange?: (value: any, model: DfSelectModel) => void;
}

export type DfSelectModelOption = XOR<
  DfSelectModelOptionNormal,
  DfSelectModelOptionGroup
>;

@ComponentInjector(forwardRef(() => SelectComponent))
export class DfSelectModel extends BaseModel implements OnInit {
  static override createCustomModel: (options: DfSelectModelOption, model?: Type<any>) => DfSelectModel;

  nzMode: NzSelectModeType = 'default';
  nzPlaceHolder = '';
  nzMaxMultipleCount: number = Infinity;
  nzMaxTagCount: number = Infinity;
  nzAllowClear = true;
  nzShowArrow = true;
  nzShowSearch = false;
  nzOptions: DfSelectOptionInterface[] = [];
  // 支持异步加载的option
  nzOptionsAsync: (() => Promise<DfSelectOptionInterface[]>) | null = null;
  nzOptionsGroup!: NzSelectGroupOptionInterface[] | BehaviorSubject<NzSelectGroupOptionInterface[]>;
  override nzSize: NzSelectSizeType = 'default';

  constructor(option: DfSelectModelOption) {
    super(option);
    this.initReplica(option);
    // TODO-README nzSelect 配置 https://ng.ant.design/components/select/zh#nz-select
    Object.assign(this, option);
    this.initValue();
  }

  // 当select为多选模式时候, 初始值必须为数组，否则会报错
  initValue() {
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

  ngOnInit(): void {
    this.asyncInitValue();
  }

  private async asyncInitValue() {
    if (this.nzOptionsAsync && isFunction(this.nzOptionsAsync)) {
      try {
        this.loading = true;
        let options = await this.nzOptionsAsync();
        this.nzOptions = options;
      } catch (error) {
        throw new Error(`【dynamic_select】=> ${error}`)
      } finally {
        this.loading = false;
      }
    }
  }
}
