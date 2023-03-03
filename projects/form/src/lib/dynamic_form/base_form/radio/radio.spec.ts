import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormGroup } from "@angular/forms";
import { DynamicComponentLoaderComponent } from "../../dynamic_loader/dynamicComponentLoader.component";
import { DynamicFormModuleV2 } from "../../dynamicForm.module";
import { DfRadioModel } from "./radio.model";

describe('dynamic radio', () => {
  let fixture: ComponentFixture<DynamicComponentLoaderComponent>;
  let radioModel: DfRadioModel;
  let cpt: DynamicComponentLoaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DynamicFormModuleV2],
    });
    fixture = TestBed.createComponent(DynamicComponentLoaderComponent);
    cpt = fixture.componentInstance;
    const formGroup = new FormGroup({});
    radioModel = new DfRadioModel({
      id: 'input',
      label: 'test',
      nzRadio: [
        {
          label: '选项一',
          value: 1,
          nzDisabled: true,
        },
        {
          label: '选项二',
          value: 2,
          nzDisabled: false,
        },
        {
          label: '选项三',
          value: 3,
          nzDisabled: false,
        }
      ],
      value: 1,
      formGroup,
    });
    cpt.model = radioModel;
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
    const radioEls: HTMLLabelElement[] = fixture.nativeElement.querySelectorAll('.ant-radio-group label')
    radioEls[1].click();
    expect(radioModel.value).toBe(2);
    radioEls[2].click();
    expect(radioModel.value).toBe(3);
    // click invalid
    radioEls[0].click();
    expect(radioModel.value).toBe(3);
  })

  it('input value', () => {
    radioModel.setValue(1)
    expect(radioModel.control.value).toEqual(1);
  });

  it('reset value', () => {
    radioModel.reset();
    expect(radioModel.value).toEqual(1)
  });

  it('update config', () => {
    radioModel.update({
      label: 'new Label',
    });
    expect(radioModel.label).toEqual('new Label')
  });

  it('disable input', () => {
    radioModel.disable();
    expect(radioModel.control.disabled).toBe(true);
    // No longer valid after being disabled
    expect(radioModel.control.valid).toBe(false);
  })

  it ('clear input', () => {
    radioModel.clear();
    expect(radioModel.control.value).toBe(null)
  })
  
  // it ('subscribe value', () => {
  //   inputComponent.ngAfterViewInit()

  //   radioModel.subscribeValueChange = () => {
  //     console.log(111)
  //   };
  //   setTimeout(() => {
  //     console.log(fixture.nativeElement)
  //     radioModel.setValue(1);
  //   }, (1000));
  // })
});