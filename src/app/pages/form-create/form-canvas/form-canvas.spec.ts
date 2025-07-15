import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCanvas } from './form-canvas';

describe('FormCanvas', () => {
  let component: FormCanvas;
  let fixture: ComponentFixture<FormCanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCanvas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCanvas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
