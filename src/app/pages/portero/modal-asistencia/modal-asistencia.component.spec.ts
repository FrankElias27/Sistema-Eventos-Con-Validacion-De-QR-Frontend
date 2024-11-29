import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsistenciaComponent } from './modal-asistencia.component';

describe('ModalAsistenciaComponent', () => {
  let component: ModalAsistenciaComponent;
  let fixture: ComponentFixture<ModalAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAsistenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
