import { InjectionToken } from "@angular/core";
import { InjectComponentConfig } from "./form.type";


export const COMPONENT_CONFIG_TOKEN = new InjectionToken<InjectComponentConfig>('COMPONENT_CONFIG');