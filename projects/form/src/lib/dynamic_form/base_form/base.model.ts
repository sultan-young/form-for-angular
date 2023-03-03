import { EventEmitter, TemplateRef, Type } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  DfFormItemModelSet,
  DfFormItemModelSetOption,
  IUpdateValue,
} from '../types';
import { DfGroupModel } from '../dynamicForm.model';
import { isFunction } from '../utils/tools';
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { dfGroupCreated } from '../lifecycle.hook';
import { filter, map, startWith, tap } from 'rxjs/operators';

type NzSize = 'default' | 'small' | 'large';
type FormControlStatus = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';
export interface IDescriptionTypeInfo {
  text: string;
  moreText: string;
  moreContent: string;
  moreLinkUrl?: string;
}
type DescriptionType = string | IDescriptionTypeInfo | TemplateRef<void>;
type OmitIdModelOption = Omit<IBaseModelOption, 'id'>;
type ValueMatched<T extends keyof OmitIdModelOption> = OmitIdModelOption[T];
type NotValueMatched<T extends keyof OmitIdModelOption> = OmitIdModelOption[T];
type ListenerSet = {
  [props in keyof OmitIdModelOption]?: [ValueMatched<props>, NotValueMatched<props>];
};

// 观测其他字段
export interface Listener {
  watch: string[];
  when: (...watchModel: ModelValue[]) => boolean;
  /**
   * TIPS: 当set 和 do同时修改一个值时候，以do的更新为准
   */
  set?: ListenerSet;
  /**
   * TIPS: 当set 和 do同时修改一个值时候，以do的更新为准
   */
  do?: (self: BaseModel, ...listeners: BaseModel[]) => void;
  otherwise?: (self: BaseModel, ...listeners: BaseModel[]) => void;
}

export interface IBaseModelOption {
  id: string;
  label?: string;
  formGroup?: FormGroup;

  value?: ModelValue;
  valueAsync?: () => Promise<ModelValue>;

  placeholder?: string | any;
  disabled?: boolean;
  visible?: boolean;
  hidden?: boolean;
  maxLength?: number;
  // 组件验证器
  validators?: ValidatorFn | ValidatorFn[];
  nzErrorTip?: string | customValidatorErrorTipFn;
  nzBorderless?: boolean;
  nzSize?: NzSize;
  description?: DescriptionType;
  loading?: boolean;

  // 监听其他表单
  listeners?: Listener[];

  /**
   * 注意：当需要在改回调函数中更新自身的值，需要在第二个参数中填写 emitEvent: false;
   * @example
   * ```typescript
   * model.setValue([], {
   *           emitEvent: false
   *        })
   * ```
   * 值变化时候回调。
   * 需要使用this时候请使用箭头函数
   */
  ngModelChange?: (value: any, model: any) => void;

  // 布局,样式相关属性
  nzLabelSpan?: number;
  nzControlSpan?: number;
  itemStyle?: { [props: string]: string };
  labelStyle?: { [props: string]: string };
  controlStyle?: { [props: string]: string };
  className?: string;

  /**
   * 不需要关注的属性
   */
  parentModel?: DfGroupModel;
}

type util<T> = T extends never ? never : BehaviorSubject<T>;
export type ModelValueNormal =
  | string
  | number
  | any[]
  | boolean
  | undefined
  | null
  | Date;
export type ModelValue = ModelValueNormal | util<ModelValueNormal>;

type customValidatorErrorTipFn = (err: ValidationErrors | null) => string;
export abstract class BaseModel implements dfGroupCreated {
  static createCustomModel = function (
    options: any,
    model?: Type<any>
  ): DfFormItemModelSet {
    // @ts-ignore
    const self = this;
    const customModelOptions = (model as any)._customModelOptions;
    const assignOptions = Object.assign({}, customModelOptions, options);
    const formModel = new self(assignOptions);

    // 这里
    formModel._component = model || self._component;
    return formModel;
  };

  public id!: string;
  public control!: FormControl;
  public label = '';
  public placeholder = '';

  /**
   * TIPS：不要直接修改这里的值，否则可能会造成与control中的value不同步的情况。如需要修改，请调用setValue方法。
   */
  public valueAsync!: () => Promise<ModelValue>;
  get value() {
    return this.control?.value;
  }

  set value(newValue) {
    let _value = newValue;
    if (newValue instanceof BehaviorSubject) {
      _value = newValue.value;
    }
    this.setControlValue(_value, {
      emitEvent: false,
    });
  }

  // 控件禁用状态
  private _disabled = false;
  // 控件上次的禁用状态。当控件被隐藏时候，默认会将控件禁用。在重新显示之后，根据lastDisabled进行复原
  private lastDisabled = this.disabled;
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this.lastDisabled = this._disabled;
    this._disabled = value;
    value ? this.disable() : this.enable();
  }

  // 控件显隐状态
  private _visible = true;
  /**
   * 将控件隐藏，并且将控件置为【disable!!!】   
   * 控件的model还存在，只是不在视图中显示。
   */
  get visible() {
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;
    if (!value) {
      this.disable();
    } else {
      this.lastDisabled ? this.disable() : this.enable();
    }
  }
  public hidden = false;

  // 组件验证器
  validators?: ValidatorFn | ValidatorFn[];

  nzErrorTip?: string | customValidatorErrorTipFn = '';
  nzBorderless = false;
  nzSize = 'default';
  formGroup?: FormGroup;
  description?: DescriptionType;

  // 布局相关属性
  nzLabelSpan?: number;
  nzControlSpan?: number;
  itemStyle = {};
  labelStyle = {};
  controlStyle = {};
  className = '';
  loading = false;

  // 父元素model
  public parentModel!: DfGroupModel;
  // 原始副本
  protected readonly originalReplica: any = {};

  // 监听器
  ngModelChange?: (value: any, model: any) => void;
  public valueChanges: Array<(value: any, model: any) => void> = [];
  public subscribeValueChange(cb: (value: any, model: any) => void) {
    this.valueChanges.push(cb);
  }

  listeners: Listener[] = []

  constructor(option: IBaseModelOption);
  constructor(option: IBaseModelOption) {
    Object.assign(this, option);
    this.validateModel();
    this.initModel();
  }
  // 初始化model
  private initModel() {
    this.initControl();
    this.initState();
    this.initValidators();
  }
  

  // 验证model有效性
  validateModel() {
    if (!this.id) {
      throw new Error('No valid id assigned');
    }
  }

  protected initReplica(option: any) {
    Object.assign(this.originalReplica, this, option);
  }

  private initControl() {
    this.control = new FormControl(this.value);
    if (this.formGroup) {
      this.injectFormGroup(this.formGroup);
    }
  }

  protected async initState() {
    if (isFunction(this.valueAsync)) {
      try {
        this.loading = true;
        const value = await this.valueAsync();
        this.setValue(value);
      } catch (error) {
        throw new Error(`【dynamic_form_base】=> ${error}`);
      } finally {
        this.loading = false;
      }
    }
  }

  private initValidators() {
    if (this.validators) {
      this.setValidators(this.validators);
    }
  }
  private setValidators(validators: ValidatorFn | ValidatorFn[]) {
    this.control.setValidators(validators);
  }

  /**
   * 该方法提供给模板式调用动态表单
   */
  protected injectFormGroup(formGroup: FormGroup) {
    if (formGroup instanceof FormGroup) {
      formGroup.addControl(this.id, this.control);
    } else {
      throw Error('It is not an expected value');
    }
  }

  setValue(value: ModelValue, options?: IUpdateValue) {
    if (this.control.value === value && this.value === value) return;
    this.setControlValue(value, options);
  }

  private setControlValue(value: ModelValue, options?: IUpdateValue) {
    if (!this.control) return;
    this.control.setValue(value, options);
  }

  disable(opts: { onlySelf?: boolean; emitEvent?: boolean } = {}): void {
    if (!this._disabled) {
      this._disabled = true;
    }
    if (!this.control) return;
    this.control.disable(opts);
  }
  enable(opts: { onlySelf?: boolean; emitEvent?: boolean } = {}) {
    if (this._disabled) {
      this._disabled = false;
    }
    if (!this.control) return;
    this.control.enable(opts);
  }

  /**
   * 更新表单
   *
   * @example 更新使用Object.async方式实现，只能实现一层覆盖。如需深层更新，请使用一下方式
   * ```typescript
   * this.model.update({
   *    nzExample: {
   *        ...this.model.nzExample,
   *        a: 1,
   *    }
   * })
   * ```
   */
  update<T extends DfFormItemModelSet>(option: Partial<T>): void {
    Object.assign(this, option);
    if (option.hasOwnProperty('value')) {
      this.setValue(option.value);
    }
  }

  // 重置表单默认值
  reset(options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    this.control.reset(this.originalReplica.value, options);
  }

  // 重置表单配置和默认值
  // abstract reset(): void
  resetAll(options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    Object.assign(this, this.originalReplica);
    this.reset(options);
  }

  // 清空表单值
  clear(): void {
    this.value = null;
    this.control.reset();
  }

  get status(): FormControlStatus {
    return this.control.status as FormControlStatus;
  }

  // 当form group创建完毕. NOTE: 注意不是真实的挂在到了dom上
  public dfGroupCreated () {
    this.initListener();
  }

  // 处理表单联动
  initListener() {
    this.listeners.forEach(listener => {
      const { watch, when, do: doSomeThing, otherwise, set = {}} = listener;
      const models = watch.map(modelId => this.parentModel.getModel(modelId));
      const modelValueChangeList$ = models.map(model => model.control.valueChanges.pipe(startWith(model.value)));
      // 将观测到的多个model流结合起来
      combineLatest(modelValueChangeList$).pipe(
        map(modelValues => when(...modelValues))
      ).subscribe(result => {
        let option: OmitIdModelOption = {}
        for (let key in set) {
          const _key = key as keyof ListenerSet;
          const [ valueMatched, valueNotMatched ] = (set as any)[_key];
          option[_key] = result ? valueMatched : valueNotMatched;
        };
        this.update(option);

        // 满足条件，触发do
        if (result && doSomeThing) {
          doSomeThing(this, ...models)
        } 
        // 不满足条件，触发otherwise
        else if (!result && otherwise){
          otherwise(this, ...models)
        }
      })
    })
  }
}