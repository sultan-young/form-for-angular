import { ComponentRef, Type } from "@angular/core";

export interface RXElement extends ComponentMeta{
  uid: string;
  host: HTMLElement,
  componentRef: ComponentRef<any>,
  props?: {
    [prop: string]: unknown
  }
}

export interface ComponentMeta {
  name: string;
  key: string;
  component: Type<any>;
}

export type ComponentMetaConfig = ComponentMeta[];