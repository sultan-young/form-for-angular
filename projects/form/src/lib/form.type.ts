import { Type } from "@angular/core";

interface InjectComponent {
  name: string;
  key: string;
  component: Type<any>;
}
export type InjectComponentConfig = InjectComponent[];

// 组件实例接口
export interface ComponentInstance {
    name: string;
    id: string;
    componentType: Type<any>,
    props: {
        [prop: string]: unknown
    }
}