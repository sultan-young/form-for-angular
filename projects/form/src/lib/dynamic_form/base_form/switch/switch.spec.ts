import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormGroup } from "@angular/forms";
import { DynamicComponentLoaderComponent } from "../../dynamic_loader/dynamicComponentLoader.component";
import { DynamicFormModuleV2 } from "../../dynamicForm.module";
import { DfSwitchModel } from "./switch.model";

describe('dynamic switch', () => {
  let fixture: ComponentFixture<DynamicComponentLoaderComponent>;
  let switchModel: DfSwitchModel;
  let cpt: DynamicComponentLoaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DynamicFormModuleV2],
    });
    fixture = TestBed.createComponent(DynamicComponentLoaderComponent);
    cpt = fixture.componentInstance;
    const formGroup = new FormGroup({});
    switchModel = new DfSwitchModel({
      id: 'switch',
      label: 'test',
      value: true,
      formGroup,
    });
    cpt.model = switchModel;
    cpt.formConfig = {
      multipleColumn: 1,
      layout: 'horizontal',
      nzLabelSpan: 4,
      nzControlSpan: 20,
      style: {},
    };
  });

  it('user click', () => {
    fixture.detectChanges();
    const switchEl: HTMLLabelElement = fixture.nativeElement.querySelector('nz-switch > button')
    switchEl.click();
    expect(switchModel.value).toBe(false);
    expect(switchModel.control.value).toBe(false);
    switchEl.click();
    expect(switchModel.value).toBe(true);
    expect(switchModel.control.value).toBe(true);
  })

  it('change value', () => {
    switchModel.setValue(false)
    expect(switchModel.control.value).toEqual(false);
  });

  it('reset value', () => {
    switchModel.reset();
    expect(switchModel.value).toEqual(true)
  });

  it('update config', () => {
    switchModel.update({
      label: 'new Label',
    });
    expect(switchModel.label).toEqual('new Label')
  });

  it('disable model', () => {
    switchModel.disable();
    expect(switchModel.control.disabled).toBe(true);
    // No longer valid after being disabled
    expect(switchModel.control.valid).toBe(false);
  })

  it ('clear value', () => {
    switchModel.clear();
    expect(switchModel.control.value).toBe(null)
  })
});