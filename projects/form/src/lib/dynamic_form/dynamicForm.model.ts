import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { BaseModel, ModelValue } from './base_form/base.model';
import { DfGroupModelOptionConfig, DfFormItemModelSet, IUpdateValue, OptionalDfFormItemModelSet, PatchUpdateOptionParams, PatchUpdateValueParams } from './types';
import { touchDirtyValidity } from './utils/validateForm';
import { dfGroupCreated } from './lifecycle.hook';

export class DfGroupModel {
  config: DfGroupModelOptionConfig = {
    multipleColumn: 1,
    layout: 'horizontal',
    nzLabelSpan: 4,
    nzControlSpan: 20,
    style: {}
  };
  group: DfFormItemModelSet[] = [];
  formGroup !: FormGroup;

  constructor(group: DfFormItemModelSet[], config?: DfGroupModelOptionConfig) {
    this.validateGroupModel(group);
    this.group = group;
    Object.assign(this.config, config);
    this.initFormGroup();
    this.afterCreated();
  }
  
  private validateGroupModel(group: Array<BaseModel>) {
    const ids = group.map(model => model.id);
    if(ids.length !== new Set(ids).size) {
      throw('model中的id具有重复项，请检查.')
    }
  }

  private initFormGroup() {
    const formGroupControl = new FormGroup({});
    this.group.forEach((item) => {
      formGroupControl.addControl(item.id, item.control)
      item.formGroup = formGroupControl;
      item.parentModel = this;
    });
    this.formGroup = formGroupControl;
  }

  private afterCreated() {
    this.group.forEach(childModel => {
      childModel.dfGroupCreated()
    })
  }

  /**
   * 更新Form表单的配置，例如多行还是单行
   * @param option 
   */
  updateFormGroupConfig(option: DfGroupModelOptionConfig) {
    Object.assign(this.config, option)
  }

  /**
   * 根据id更新对应model的配置， 包括value
   * @param id 
   * @param option 
   */
  update<K extends DfFormItemModelSet>(id: string, option: Partial<K>) {
    const model = this.getModel(id);
    model.update(option)
  }
  
  /**
   * 根据id更新对应model的value
   * @param id 
   * @param value 
   */
  updateValue(id: string, value: ModelValue, options?: IUpdateValue) {
    const model = this.getModel(id);
    model.setValue(value, options)
  }

  // 重置所有表单
  reset(options?: { onlySelf?: boolean; emitEvent?: boolean }) {
    this.group.forEach(model => {
      model.reset(options)
    })
  }

  // 重置所有表单和默认值
  resetAll(options?: { onlySelf?: boolean; emitEvent?: boolean }) {
    this.group.forEach(model => {
      model.resetAll(options)
    })
  }

  // 清空所有表单
  clear() {
    this.group.forEach(model => {
      model.clear()
    })
  }

  /**
   * 批量更新表单，包括表单配置
   * @param modelGroup 
   */
   patchForm(modelGroup: PatchUpdateOptionParams) {
    for (let modelId in modelGroup) {
      this.update(modelId, modelGroup[modelId] as any)
    }
  }

  /**
   * 批量更新表单值
   * @param modelGroup 
   */
   patchValue(groupValue: PatchUpdateValueParams) {
    this.formGroup.patchValue(groupValue)
    for (let modelId in groupValue) {
      const model = this.getModel(modelId);
      model.value = groupValue[modelId];
    }
  }

  // 根据id获取对应model
  getModel<T extends DfFormItemModelSet>(id: string): T {
    const model = this.group.find(item => item.id === id);
    if (!model) {
      throw new Error(`does not match id:${id}`);
    };
    return model as T; 
  }

  get value() {
    return this.formGroup.value;
  }

  // 此控件的原始值。对于大多数控件实现，原始值将包括禁用的子项。
  public getRawValue() {
    return this.formGroup.getRawValue();
  }

  // 添加一个新的control
  addControl(name: string, control: AbstractControl) {
    this.formGroup.addControl(name, control);
  }

  touchDirtyValidity() {
    touchDirtyValidity(this.formGroup);
  }

  disable(opts: { onlySelf?: boolean; emitEvent?: boolean } = {}) {
    for (let modelId in this.group) {
      this.group[modelId].disable(opts);
    }
  }

  enable(opts: { onlySelf?: boolean; emitEvent?: boolean } = {}) {
    for (let modelId in this.group) {
      this.group[modelId].enable(opts);
    }
  }

}
