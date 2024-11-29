import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateQrsComponent } from './validate-qrs.component';

describe('ValidateQrsComponent', () => {
  let component: ValidateQrsComponent;
  let fixture: ComponentFixture<ValidateQrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateQrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateQrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
