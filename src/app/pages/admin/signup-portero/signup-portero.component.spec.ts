import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPorteroComponent } from './signup-portero.component';

describe('SignupPorteroComponent', () => {
  let component: SignupPorteroComponent;
  let fixture: ComponentFixture<SignupPorteroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupPorteroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupPorteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
