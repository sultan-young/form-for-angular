import { InjectionToken } from "@angular/core";
import { ComponentMetaConfig } from "./form.type";


export const COMPONENT_CONFIG_TOKEN = new InjectionToken<ComponentMetaConfig>('COMPONENT_CONFIG');