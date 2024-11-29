import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListaInvitadosComponent } from './modal-lista-invitados.component';

describe('ModalListaInvitadosComponent', () => {
  let component: ModalListaInvitadosComponent;
  let fixture: ComponentFixture<ModalListaInvitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalListaInvitadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalListaInvitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
