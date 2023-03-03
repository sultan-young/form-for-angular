import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { DynamicComponentLoaderComponent } from '../../dynamic_loader/dynamicComponentLoader.component';
import { DynamicFormModuleV2 } from '../../dynamicForm.module';
import { DfSelectModel } from './select.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('dynamic select', () => {
  let fixture: ComponentFixture<DynamicComponentLoaderComponent>;
  let selectModel: DfSelectModel;
  let cpt: DynamicComponentLoaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DynamicFormModuleV2, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(DynamicComponentLoaderComponent);
    cpt = fixture.componentInstance;
    const formGroup = new FormGroup({});
    selectModel = new DfSelectModel({
      id: 'select',
      label: 'test',
      nzOptions: [
        {
          label: '选项一',
          value: 1,
        },
        {
          label: '选项二',
          value: 2,
        },
        {
          label: '选项三',
          value: 3,
        },
      ],
      value: 1,
      formGroup,
    });
    cpt.model = selectModel;
    cpt.formConfig = {
      multipleColumn: 1,
      layout: 'horizontal',
      nzLabelSpan: 4,
      nzControlSpan: 20,
      style: {},
    };
  });

  it('change value', () => {
    selectModel.setValue(2);
    expect(selectModel.control.value).toEqual(2);
  });

  it('reset value', () => {
    selectModel.reset();
    expect(selectModel.value).toEqual(1);
  });

  it('update config', () => {
    selectModel.update({
      label: 'new Label',
    });
    expect(selectModel.label).toEqual('new Label');
  });

  it('disable model', () => {
    selectModel.disable();
    expect(selectModel.control.disabled).toBe(true);
    // No longer valid after being disabled
    expect(selectModel.control.valid).toBe(false);
  });

  it('clear value', () => {
    selectModel.clear();
    expect(selectModel.control.value).toBe(null);
  });

  it('change option', () => {
    selectModel.update({
      nzOptions: [
        {
          label: '选项A',
          value: 'A',
        },
        {
          label: '选项B',
          value: 'B',
        },
        {
          label: '选项C',
          value: 'C',
        },
      ],
      value: 'A',
    });
    expect(selectModel.control.value).toBe('A');
  });
});
