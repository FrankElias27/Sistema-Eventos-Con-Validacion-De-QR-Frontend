import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReporteAsistenciaComponent } from './modal-reporte-asistencia.component';

describe('ModalReporteAsistenciaComponent', () => {
  let component: ModalReporteAsistenciaComponent;
  let fixture: ComponentFixture<ModalReporteAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReporteAsistenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReporteAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
