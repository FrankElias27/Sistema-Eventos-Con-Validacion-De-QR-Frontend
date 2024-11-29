import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReportInvitadosUsuarioComponent } from './modal-report-invitados-usuario.component';

describe('ModalReportInvitadosUsuarioComponent', () => {
  let component: ModalReportInvitadosUsuarioComponent;
  let fixture: ComponentFixture<ModalReportInvitadosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReportInvitadosUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReportInvitadosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
