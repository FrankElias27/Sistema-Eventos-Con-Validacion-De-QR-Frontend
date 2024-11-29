import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupClienteComponent } from './signup-cliente.component';

describe('SignupClienteComponent', () => {
  let component: SignupClienteComponent;
  let fixture: ComponentFixture<SignupClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
