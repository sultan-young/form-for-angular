import { TemplateRef } from "@angular/core";
import { AbstractControl } from "@angular/forms";

export const hasRequiredField = (abstractControl: AbstractControl): boolean => {
  if (abstractControl.validator) {
    const validator = abstractControl.validator({} as AbstractControl);
    if (validator && validator['required']) {
      return true;
    }
  }
  return false;
};

export function isFunction(params: any): boolean {
  return typeof params === 'function';
}

export function isString(params: any): boolean {
  return typeof params === 'string';
}

export function isObject(params: any): boolean {
  return Object.prototype.toString.call(params) === '[object Object]';
}

export function isTemplateRef(params: any): boolean {
  return params instanceof TemplateRef;
}