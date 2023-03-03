import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormGroup } from "@angular/forms";
import { DynamicComponentLoaderComponent } from "../../dynamic_loader/dynamicComponentLoader.component";
import { DfTextAreaModel } from "./textArea.model";

describe('dynamic text area', () => {
  let fixture: ComponentFixture<DynamicComponentLoaderComponent>;
  let textAreaModel: DfTextAreaModel;

  beforeEach(() => {
    textAreaModel = new DfTextAreaModel({
      id: 'input',
      label: 'test',
      value: 'Initialized value',
      formGroup: new FormGroup({})
    });
  });

  it('input value', () => {
    textAreaModel.setValue(10)
    expect(textAreaModel.control.value).toEqual(10);
    textAreaModel.setValue([1,2,3]);
    expect(textAreaModel.control.value).toEqual([1,2,3]);
  });

  it('reset value', () => {
    textAreaModel.reset();
    expect(textAreaModel.value).toEqual('Initialized value')
  });

  it('update config', () => {
    textAreaModel.update({
      label: 'new Label',
    });
    expect(textAreaModel.label).toEqual('new Label')
  });

  it('disable input', () => {
    textAreaModel.disable();
    
    expect(textAreaModel.control.disabled).toBe(true);
    // No longer valid after being disabled
    expect(textAreaModel.control.valid).toBe(false);
  })

  it ('clear input', () => {
    textAreaModel.clear();
    expect(textAreaModel.control.value).toBe(null)
  })
  
});