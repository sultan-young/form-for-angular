import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormGroup } from "@angular/forms";
import { DynamicComponentLoaderComponent } from "../../dynamic_loader/dynamicComponentLoader.component";
import { DfInputNumberModel } from "./inputNumber.model";
import { DynamicFormModuleV2 } from "../../dynamicForm.module";

describe('dynamic input number', () => {
  let fixture: ComponentFixture<DynamicComponentLoaderComponent>;
  let inputNumberModel: DfInputNumberModel;
  let cpt: DynamicComponentLoaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DynamicFormModuleV2],
    });
    fixture = TestBed.createComponent(DynamicComponentLoaderComponent);
    cpt = fixture.componentInstance;
    const formGroup = new FormGroup({});
    inputNumberModel = new DfInputNumberModel({
      id: 'input',
      label: 'test',
      value: 'Initialized value',
      formGroup,
    });
    cpt.model = inputNumberModel;
    cpt.formConfig = {
      multipleColumn: 1,
      layout: 'horizontal',
      nzLabelSpan: 4,
      nzControlSpan: 20,
      style: {},
    };
  });

  it('user emit value', () => {
    fixture.detectChanges();
    const inputEL: HTMLInputElement = fixture.nativeElement.querySelector('.ant-input-number-input-wrap input')
    inputEL.value = '666';
    inputEL.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputNumberModel.value).toBe(666);
    expect(inputNumberModel.control.value).toBe(666)
  })

  it('input value', () => {
    inputNumberModel.setValue(10)
    expect(inputNumberModel.control.value).toEqual(10);
  });

  it('reset value', () => {
    inputNumberModel.reset();
    expect(inputNumberModel.value).toEqual('Initialized value')
  });

  it('update config', () => {
    inputNumberModel.update({
      label: 'new Label',
    });
    expect(inputNumberModel.label).toEqual('new Label')
  });

  it('disable input', () => {
    inputNumberModel.disable();
    
    expect(inputNumberModel.control.disabled).toBe(true);
    // No longer valid after being disabled
    expect(inputNumberModel.control.valid).toBe(false);
  })

  it ('clear input', () => {
    inputNumberModel.clear();
    expect(inputNumberModel.control.value).toBe(null)
  })
  
  // it ('subscribe value', () => {
  //   inputComponent.ngAfterViewInit()

  //   inputNumberModel.subscribeValueChange = () => {
  //     console.log(111)
  //   };
  //   setTimeout(() => {
  //     console.log(fixture.nativeElement)
  //     inputNumberModel.setValue(1);
  //   }, (1000));
  // })
});