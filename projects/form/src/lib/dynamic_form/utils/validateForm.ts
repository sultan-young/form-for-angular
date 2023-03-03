import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

export function touchDirtyValidity(forms: FormGroup | FormArray) {
    if (forms instanceof FormArray) {
      let arrayForms = forms as never as FormArray;
      const controls = arrayForms.controls;
      for (let form of controls) {
        markDirty(form);
        if ((form as any)?.controls) {
          touchDirtyValidity(form as FormGroup | FormArray)
        }
      };
    } else if (forms instanceof FormGroup) {
      let groupForms = forms as never as FormGroup;
      const controls = groupForms.controls;
      for (let form in controls) {
        if (controls.hasOwnProperty(form)) {
          controls[form].markAsDirty();
          controls[form].updateValueAndValidity();
        }
      }
    } else {
      throw new Error(`未知的入参`);
    }
}

export function markDirty(control: AbstractControl) {
  control.markAsDirty();
  control.updateValueAndValidity();
}