import { Type } from "@angular/core";

export interface ComponentMeta {
  name: string;
  key: string;
  component: Type<any>;
}
export type ComponentMetaConfig = ComponentMeta[];

// 组件实例接口
export interface ComponentInstance {
    name: string;
    id: string;
    componentType: Type<any>,
    props: {
        [prop: string]: unknown
    }
}