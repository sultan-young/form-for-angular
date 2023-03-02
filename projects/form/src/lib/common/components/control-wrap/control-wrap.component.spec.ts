/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ControlWrapComponent } from './control-wrap.component';

describe('ControlWrapComponent', () => {
  let component: ControlWrapComponent;
  let fixture: ComponentFixture<ControlWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
