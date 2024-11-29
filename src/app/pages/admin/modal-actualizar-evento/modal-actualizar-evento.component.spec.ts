import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarEventoComponent } from './modal-actualizar-evento.component';

describe('ModalActualizarEventoComponent', () => {
  let component: ModalActualizarEventoComponent;
  let fixture: ComponentFixture<ModalActualizarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarEventoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalActualizarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
