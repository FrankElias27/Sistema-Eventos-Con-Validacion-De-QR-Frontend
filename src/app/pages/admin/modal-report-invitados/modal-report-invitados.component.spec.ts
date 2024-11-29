import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReportInvitadosComponent } from './modal-report-invitados.component';

describe('ModalReportInvitadosComponent', () => {
  let component: ModalReportInvitadosComponent;
  let fixture: ComponentFixture<ModalReportInvitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReportInvitadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReportInvitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
