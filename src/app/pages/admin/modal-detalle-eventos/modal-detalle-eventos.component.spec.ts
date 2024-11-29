import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleEventosComponent } from './modal-detalle-eventos.component';

describe('ModalDetalleEventosComponent', () => {
  let component: ModalDetalleEventosComponent;
  let fixture: ComponentFixture<ModalDetalleEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalleEventosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetalleEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
