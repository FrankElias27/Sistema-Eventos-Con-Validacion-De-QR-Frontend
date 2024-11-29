import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAdminSistemaComponent } from './signup-admin-sistema.component';

describe('SignupAdminSistemaComponent', () => {
  let component: SignupAdminSistemaComponent;
  let fixture: ComponentFixture<SignupAdminSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAdminSistemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupAdminSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
