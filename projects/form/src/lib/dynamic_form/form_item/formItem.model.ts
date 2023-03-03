interface DfInputModelOption {
  id: string;
  label: string;
  value: string;
  placeholder: string;
}

export class DynamicFormItemModel {

  label = '';

  constructor(option: DfInputModelOption) {
    this.label = option.label;
  }

}
