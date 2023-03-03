import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicComponentLoaderComponent } from '../../dynamic_loader/dynamicComponentLoader.component';
import { DynamicFormModuleV2 } from '../../dynamicForm.module';
import { FormGroup } from '@angular/forms';
import { DfDatePickerModel } from './datePicker.model';

describe('dynamic datePicker', () => {
  let fixture: ComponentFixture<DynamicComponentLoaderComponent>;
  let cpt: DynamicComponentLoaderComponent;
  let datePickerModel: DfDatePickerModel;
  const normalDate = new Date()
  const rangeDate = [new Date(), new Date().setDate(new Date().getDate() + 1)]

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DynamicFormModuleV2],
    });
    fixture = TestBed.createComponent(DynamicComponentLoaderComponent);
    cpt = fixture.componentInstance;
    const formGroup = new FormGroup({});
    datePickerModel = new DfDatePickerModel({
      id: 'datePicker',
      label: '时间选择',
      value: normalDate,
      formGroup: formGroup,
    });
    cpt.model = datePickerModel;
    cpt.formConfig = {
      multipleColumn: 1,
      layout: 'horizontal',
      nzLabelSpan: 4,
      nzControlSpan: 20,
      style: {},
    };
  });

  it('init value', () => {
    fixture.detectChanges();
    expect(datePickerModel.value).toEqual(normalDate)
  });

  it('change value', () => {
    const currentDate = new Date().setDate(new Date().getDate() + 1);
    datePickerModel.setValue(currentDate);
    expect(datePickerModel.value).toEqual(currentDate);
    expect(datePickerModel.control.value).toEqual(currentDate)
  });

  it('change model type', () => {
    datePickerModel.update({
      type: 'range',
    });
    expect(datePickerModel.type).toEqual('range')
  })
});
