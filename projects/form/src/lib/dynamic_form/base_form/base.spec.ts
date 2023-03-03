import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormGroup, Validators } from "@angular/forms";
import { DynamicFormModuleV2 } from "../dynamicForm.module";
import { DynamicComponentLoaderComponent } from "../dynamic_loader/dynamicComponentLoader.component";
import { DfGroupModel } from "../dynamicForm.model";
import { DfInputModel } from "./input/input.model";
import { DfInputNumberModel } from "./input_number/inputNumber.model";
import { DfSwitchModel } from "./switch/switch.model";
import { DfTextAreaModel } from "./text_area/textArea.model";
import { DynamicFormComponent } from "../dynamicForm.component";

describe('dynamic base model test', () => {
  let fixture: ComponentFixture<DynamicFormComponent>;
  let groupModel: DfGroupModel;
  let cpt: DynamicFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DynamicFormModuleV2],
    });
    fixture = TestBed.createComponent(DynamicFormComponent);
    cpt = fixture.componentInstance;
    groupModel = new DfGroupModel([
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
    ], {
      layout: 'horizontal'
    });
    cpt.dynamicFormModel = groupModel;
  });

  it('value change call', () => {
    const inputModel = groupModel.getModel<DfInputModel>('input');
    let valueSnapshot = inputModel.value;
    inputModel.ngModelChange = (value) => {
      valueSnapshot = value;
    };
    fixture.detectChanges();
    inputModel.setValue(222)
    expect(valueSnapshot).toBe(222);
  })

  it('value err tips', () => {
    const inputModel = groupModel.getModel<DfInputModel>('input');
    inputModel.control.setValidators(Validators.required)
    const nzErrorTip = '超出了最大长度';
    inputModel.update({
      nzErrorTip,
    });
    inputModel.setValue(null);
    fixture.detectChanges();
    const controlEl: Element = fixture.nativeElement.querySelector('nz-form-control');
    expect(inputModel.status === 'INVALID').toBeTrue();
    expect(inputModel.control.errors?.required).toBeTrue();
    expect(controlEl.getAttribute('ng-reflect-nz-error-tip')).toContain(nzErrorTip);
  })

  it('reset all', () => {
    const inputModel = groupModel.getModel<DfInputModel>('input');
    inputModel.setValue('value changed');
    inputModel.label = 'label changed'
    expect(inputModel.value).toBe('value changed')
    expect(inputModel.label).toBe('label changed')
    groupModel.resetAll();
    expect(inputModel.value).toBe('input');
    expect(inputModel.label).toBe('input')
  })

  it('clear value', () => {
    const inputModel = groupModel.getModel<DfInputModel>('input');
    inputModel.setValue('value changed');
    inputModel.clear();
    expect(inputModel.value).toBe(null)
  })
});