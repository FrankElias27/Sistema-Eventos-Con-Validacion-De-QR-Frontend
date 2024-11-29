import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarUserComponent } from './modal-actualizar-user.component';

describe('ModalActualizarUserComponent', () => {
  let component: ModalActualizarUserComponent;
  let fixture: ComponentFixture<ModalActualizarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalActualizarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
