import { Type } from "@angular/core";
import { BaseModel, IBaseModelOption } from "../base_form/base.model";
import { DfFormItemModelSetPartialOption } from "../types";

export const ComponentInjector = (component: Type<any>) => {
  return (constructor: Function) => {
    Promise.resolve().then(() => constructor.prototype._component = (<any>component)())
  }
}

export const DfModelOptionsInjector = (options: DfFormItemModelSetPartialOption) => {
  return (constructor: Function) => {
    (constructor as any)._customModelOptions = options;
  }
}