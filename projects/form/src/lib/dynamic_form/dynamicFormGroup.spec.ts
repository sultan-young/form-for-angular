import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamicForm.component';
import { DfGroupModel } from './dynamicForm.model';
import {
  DfCheckboxModel,
  DfDatePickerModel,
  DfInputModel,
  DfInputNumberModel,
  DfRadioModel,
  DfSwitchModel,
  DfTextAreaModel,
} from './base_form';
import { DynamicFormModuleV2 } from './dynamicForm.module';

describe('dynamic formGroup', () => {
  let cpt: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DynamicFormModuleV2],
    });
    fixture = TestBed.createComponent(DynamicFormComponent);
    cpt = fixture.componentInstance;
    const formGroupModel = new DfGroupModel([
      new DfInputModel({
        id: 'input',
        label: 'input',
        value: 'input',
      }),
      new DfInputNumberModel({
        id: 'inputNumber',
        label: 'inputNumber',
        value: 123,
      }),
      new DfSwitchModel({
        id: 'switch',
        label: 'switch',
        value: true,
      }),
      new DfTextAreaModel({
        id: 'textArea',
        label: 'textArea',
        value: 'textArea',
      }),
    ]);
    cpt.dynamicFormModel = formGroupModel;
  });

  // group create
  it('created', () => {
    expect(cpt).toBeDefined();
  });

  it('should show label', () => {
    fixture.detectChanges();
    const inputLabel: HTMLLabelElement =
      fixture.nativeElement.querySelector('label');
    expect(inputLabel.textContent).toContain('input');
  });

  it('Model value and element value should be the same', () => {
    fixture.detectChanges();
    const hostElement: HTMLElement = fixture.nativeElement;
    const input: HTMLInputElement = hostElement.querySelector('input')!;
    const model = cpt.dynamicFormModel.getModel('input');
    model.setValue('changed value');
    expect(input.value).toEqual(model.value as string)
  })


  // test initial value
  it('model init', () => {
    expect(cpt.dynamicFormModel.value).toEqual({
      input: 'input',
      inputNumber: 123,
      switch: true,
      textArea: 'textArea',
    });
  });

  // test patch update value
  it('patch update value', () => {
    cpt.dynamicFormModel.patchValue({
      input: 'input value changed',
      inputNumber: 'input value',
    });
    expect(cpt.dynamicFormModel.value).toEqual({
      input: 'input value changed',
      inputNumber: 'input value',
      switch: true,
      textArea: 'textArea',
    });
  });

  // single update value
  it('single update value', () => {
    cpt.dynamicFormModel.updateValue('input', 'input value changed');
    expect(cpt.dynamicFormModel.value.input).toEqual('input value changed');
  });

  // model disable
  it('formControl disable', () => {
    cpt.dynamicFormModel.disable();
    expect(cpt.dynamicFormModel.formGroup.disabled).toEqual(true);
  });

  it('fromControl reset', () => {
    cpt.dynamicFormModel.patchValue({
      input: 'input value changed',
      inputNumber: 'input value',
    });
    cpt.dynamicFormModel.reset();
    expect(cpt.dynamicFormModel.value).toEqual({
      input: 'input',
      inputNumber: 123,
      switch: true,
      textArea: 'textArea',
    });
  });

  it('update formGroup config', () => {
    cpt.dynamicFormModel.updateFormGroupConfig({
      multipleColumn: 3,
      layout: 'vertical',
      nzLabelSpan: 5,
      nzControlSpan:  19,
    });
    expect(cpt.dynamicFormModel.config).toEqual({
      ...cpt.dynamicFormModel.config,
      multipleColumn: 3,
      layout: 'vertical',
      nzLabelSpan: 5,
      nzControlSpan:  19,
    })
  })
});
