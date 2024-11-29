import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInitSesionComponent } from './modal-init-sesion.component';

describe('ModalInitSesionComponent', () => {
  let component: ModalInitSesionComponent;
  let fixture: ComponentFixture<ModalInitSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInitSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInitSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
