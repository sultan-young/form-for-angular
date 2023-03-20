import { ComponentRef, Type } from "@angular/core";

export interface ComponentMeta {
  name: string;
  key: string;
  component: Type<any>;
}

export type ComponentMetaConfig = ComponentMeta[];