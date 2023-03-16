import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsPanelComponent } from './props-panel.component';

describe('PropsPanelComponent', () => {
  let component: PropsPanelComponent;
  let fixture: ComponentFixture<PropsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
