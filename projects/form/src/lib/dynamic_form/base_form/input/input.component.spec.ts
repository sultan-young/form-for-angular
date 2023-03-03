import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DfInputModel } from './input.model'
import { FormGroup } from "@angular/forms";
import { DynamicComponentLoaderComponent } from "../../dynamic_loader/dynamicComponentLoader.component";

describe('dynamic input', () => {
  let fixture: ComponentFixture<DynamicComponentLoaderComponent>;
  let inputModel: DfInputModel;

  beforeEach(waitForAsync(() => {
  }));

  beforeEach(() => {
    inputModel = new DfInputModel({
      id: 'input',
      label: 'test',
      value: 'Initialized value',
      formGroup: new FormGroup({})
    });
  });

  it('input value', () => {
    inputModel.setValue(10)
    expect(inputModel.control.value).toEqual(10);
    inputModel.setValue([1,2,3]);
    expect(inputModel.control.value).toEqual([1,2,3]);
  });

  it('reset value', () => {
    inputModel.reset();
    expect(inputModel.value).toEqual('Initialized value')
  });

  it('update config', () => {
    inputModel.update({
      label: 'new Label',
    });
    expect(inputModel.label).toEqual('new Label')
  });

  it('disable input', () => {
    inputModel.disable();
    
    expect(inputModel.control.disabled).toBe(true);
    // No longer valid after being disabled
    expect(inputModel.control.valid).toBe(false);
  })

  it ('clear input', () => {
    inputModel.clear();
    expect(inputModel.control.value).toBe(null)
  })
  
  // it ('subscribe value', () => {
  //   inputComponent.ngAfterViewInit()

  //   inputModel.subscribeValueChange = () => {
  //     console.log(111)
  //   };
  //   setTimeout(() => {
  //     console.log(fixture.nativeElement)
  //     inputModel.setValue(1);
  //   }, (1000));
  // })
});