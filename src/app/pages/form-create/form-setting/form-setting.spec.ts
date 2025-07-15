import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSetting } from './form-setting';

describe('FormSetting', () => {
  let component: FormSetting;
  let fixture: ComponentFixture<FormSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
