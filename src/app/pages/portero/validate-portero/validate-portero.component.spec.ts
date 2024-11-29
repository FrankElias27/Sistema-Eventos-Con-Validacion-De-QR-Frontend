import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatePorteroComponent } from './validate-portero.component';

describe('ValidatePorteroComponent', () => {
  let component: ValidatePorteroComponent;
  let fixture: ComponentFixture<ValidatePorteroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatePorteroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatePorteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
