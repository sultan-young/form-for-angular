import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DfCheckboxModel, ICheckboxValueList } from './checkbox.model';
import { DynamicComponentLoaderComponent } from '../../dynamic_loader/dynamicComponentLoader.component';
import { DynamicFormModuleV2 } from '../../dynamicForm.module';
import { FormGroup } from '@angular/forms';

describe('dynamic checkbox', () => {
  let fixture: ComponentFixture<DynamicComponentLoaderComponent>;
  let cpt: DynamicComponentLoaderComponent;
  let checkModel: DfCheckboxModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DynamicFormModuleV2],
    });
    fixture = TestBed.createComponent(DynamicComponentLoaderComponent);
    cpt = fixture.componentInstance;
    const formGroup = new FormGroup({});
    checkModel = new DfCheckboxModel({
      id: 'checkBox',
      label: '多选',
      value: [
        {
          label: '多选一',
          value: 1,
          checked: false,
        },
        {
          label: '多选二',
          value: 2,
          checked: false,
        },
        {
          label: '多选三',
          value: 3,
          checked: false,
        },
      ],
      formGroup: formGroup,
    });
    cpt.model = checkModel;
    cpt.formConfig = {
      multipleColumn: 1,
      layout: 'horizontal',
      nzLabelSpan: 4,
      nzControlSpan: 20,
      style: {},
    };
  });

  it('click check option', () => {
    fixture.detectChanges();
    const optionOneEl: HTMLLabelElement = fixture.nativeElement.querySelector(
      'nz-checkbox-group label'
    );
    optionOneEl.click();
    expect((checkModel.value as ICheckboxValueList)[0].checked).toEqual(true);
  });

  it('change value', () => {
    cpt.model.setValue([
      {
        label: '多选一',
        value: 1,
        checked: true,
      },
      {
        label: '多选二',
        value: 2,
        checked: true,
      },
      {
        label: '多选三',
        value: 3,
        checked: true,
      },
    ]);

    expect((checkModel.value as ICheckboxValueList).every(item => item.checked)).withContext('context').toBe(true);
  });
});
