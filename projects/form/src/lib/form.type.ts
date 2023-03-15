import { Type } from "@angular/core";

interface InjectComponent {
  name: string;
  key: string;
  component: Type<any>;
}
export type InjectComponentConfig = InjectComponent[];
