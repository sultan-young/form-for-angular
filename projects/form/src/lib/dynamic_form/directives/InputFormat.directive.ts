import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

const format = {
  char: '[^A-Za-z]',
  number: '[^0-9]',
  charAndNumber: '[^A-Za-z0-9]',
  unChinese: '[\u4e00-\u9fa5]',
  custom: '',
};

export type FORMAT_TYPE = keyof {
  [key in keyof typeof format]: string;
};

export interface InputFormat {
  format?: FORMAT_TYPE;
  len?: number;
  trim?: boolean;
}

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  @Input('appInputFormat') inputFormat: InputFormat | undefined;
  @Input('customRegRule') customRegRule !: RegExp;

  public isCompositionEvent = false;

  constructor(private elementRef: ElementRef, private control: NgControl) {
  }

  public clean(evt: KeyboardEvent): void {
    if (!this.inputFormat) {
      return;
    }

    const {value} = evt.target as HTMLInputElement | HTMLTextAreaElement;
    if (value) {
      let newValue = value;
      if (this.inputFormat.format) {
        const formatReg = this.customRegRule ? this.customRegRule : format[this.inputFormat.format];
        newValue = value.replace(new RegExp(formatReg, 'g'), '');
      }

      if (this.inputFormat.len && newValue.length > this.inputFormat.len) {
        newValue = newValue.substr(0, this.inputFormat.len);
      }

      // 是否去除首尾空格
      if (this.inputFormat.trim) {
        newValue = newValue.trim();
      }
      this.control.control!.setValue(newValue);
    }
  }

  @HostListener('keydown', ['$event'])
  keydownFun(evt: KeyboardEvent): void {

    const {value} = evt.target as HTMLInputElement | HTMLTextAreaElement;

    if (!this.inputFormat) {
      return;
    }

    if (!this.inputFormat.format && !this.inputFormat.len) {
      return;
    }
    let key = evt.key;
    // TIPS: 由于本指令采用的是否定匹配，而正则表达式不擅长逆向匹配，所以对于特殊按键，如Enter使用转义字符来表示进行匹配
    if (key === 'Enter') {
      key = '\n';
    }

    // 处理日常组合键，只允许部分组合键
    const specialKeysWhiteList = ['Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey || specialKeysWhiteList.includes(key)) {
      return;
    }

    // 处理选中替换文本;
    const selectText = window.getSelection()!.toString();
    const selectTextLen = selectText ? selectText.length : 0;
    if (value && this.inputFormat.len && value.length >= this.inputFormat.len && selectTextLen === 0) {
      evt.preventDefault();
    }

    // 输入的文本超出格式范围时
    if ((this.inputFormat.format && key)) {
      const reg = this.customRegRule ? new RegExp(this.customRegRule, 'g') : new RegExp(format[this.inputFormat.format], 'g');
      if (reg.test(key)) {
        evt.preventDefault();
      }
    }

  }

  // 键盘按键抬起时.
  @HostListener('keyup', ['$event', '$event.target'])
  keyupFun(evt: KeyboardEvent): void {
    if (this.isCompositionEvent) {
      return;
    }
    this.clean(evt);
  }

  // 光标丢失时，清理可能存在问题的内容
  @HostListener('blur', ['$event', '$event.target'])
  blurFun(evt: KeyboardEvent): void {
    this.clean(evt);
  }

  // 合成事件开始（一般指使用输入法输入内容时）
  @HostListener('compositionstart', ['$event'])
  compositionstartFun($event: KeyboardEvent): void {
    this.isCompositionEvent = true;
  }

  // 合成事件结束（一般指使用输入法输入内容时）
  @HostListener('compositionend', ['$event'])
  compositionEndFun($event: KeyboardEvent): void {
    this.isCompositionEvent = false;
    this.clean($event);
  }

}
