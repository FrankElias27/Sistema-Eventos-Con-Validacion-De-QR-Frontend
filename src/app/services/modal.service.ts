import { Injectable, InjectionToken  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalAddEventosComponent } from '../pages/admin/modal-add-eventos/modal-add-eventos.component';
import { ModalQrComponent } from '../pages/user/modal-qr/modal-qr.component';
import { ModalViewQrComponent } from '../pages/user/modal-view-qr/modal-view-qr.component';
import { ModalDetalleEventosComponent } from '../pages/admin/modal-detalle-eventos/modal-detalle-eventos.component';
import { ModalBanUserComponent } from '../pages/admin/modal-ban-user/modal-ban-user.component';
import { ModalActualizarUserComponent } from '../pages/admin/modal-actualizar-user/modal-actualizar-user.component';
import { ModalReporteAsistenciaComponent } from '../pages/admin/modal-reporte-asistencia/modal-reporte-asistencia.component';
import { ModalActualizarEventoComponent } from '../pages/admin/modal-actualizar-evento/modal-actualizar-evento.component';
import { ModalListBirthdayComponent } from '../pages/admin/modal-list-birthday/modal-list-birthday.component';
import { ModalInitSesionComponent } from '../pages/modal-init-sesion/modal-init-sesion.component';
import { ModalReportInvitadosComponent } from '../pages/admin/modal-report-invitados/modal-report-invitados.component';
import { ModalReportInvitadosUsuarioComponent } from '../pages/admin/modal-report-invitados-usuario/modal-report-invitados-usuario.component';
import { ModalMailConfigurationComponent } from '../pages/admin/modal-mail-configuration/modal-mail-configuration.component';
import { ModalAsistenciaComponent } from '../pages/portero/modal-asistencia/modal-asistencia.component';
import { ModalListaInvitadosComponent } from '../pages/portero/modal-lista-invitados/modal-lista-invitados.component';
import { ModalViewMailComponent } from '../pages/admin-junior/modal-view-mail/modal-view-mail.component';
import { ModalValidationEventComponent } from '../pages/modal-validation-event/modal-validation-event.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dialogRef: MatDialogRef<ModalAddEventosComponent> | null = null;

  dialogRef2: MatDialogRef<ModalQrComponent> | null = null;

  dialogRef3: MatDialogRef<ModalViewQrComponent> | null = null;

  dialogRef4: MatDialogRef<ModalDetalleEventosComponent> | null = null;

  dialogRef5: MatDialogRef<ModalBanUserComponent> | null = null;

  dialogRef6: MatDialogRef<ModalActualizarUserComponent> | null = null;

  dialogRef7: MatDialogRef<ModalReporteAsistenciaComponent> | null = null;

  dialogRef8: MatDialogRef<ModalActualizarEventoComponent> | null = null;

  dialogRef9: MatDialogRef<ModalListBirthdayComponent> | null = null;

  dialogRef10: MatDialogRef<ModalInitSesionComponent> | null = null;

  dialogRef11: MatDialogRef<ModalReportInvitadosComponent> | null = null;

  dialogRef12: MatDialogRef<ModalReportInvitadosUsuarioComponent> | null = null;

  dialogRef13: MatDialogRef<ModalMailConfigurationComponent> | null = null;

  dialogRef14: MatDialogRef<ModalAsistenciaComponent> | null = null;

  dialogRef15: MatDialogRef<ModalListaInvitadosComponent> | null = null;

  dialogRef16: MatDialogRef<ModalViewMailComponent> | null = null;

  dialogRef17: MatDialogRef<ModalValidationEventComponent> | null = null;

  constructor(private dialog: MatDialog) { }

  openAddEvento(): void {
    this.dialogRef = this.dialog.open(ModalAddEventosComponent, {
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
    });
  }

  openQR(eventoId: number): void {
    this.dialogRef2 = this.dialog.open(ModalQrComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { eventoId: eventoId},
    });
  }

  openViewQR(eventoId: number): void {
    this.dialogRef3 = this.dialog.open(ModalViewQrComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { eventoId: eventoId}
    });
  }

  openDetalleEvento(eventoId: number): void {
    this.dialogRef4 = this.dialog.open(ModalDetalleEventosComponent, {
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { eventoId: eventoId}
    });
  }

  openModalBan(id: number): void {
    this.dialogRef5 = this.dialog.open(ModalBanUserComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { id: id}
    });
  }

  openActualizarUser(id: number): void {
    this.dialogRef6 = this.dialog.open(ModalActualizarUserComponent, {
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { id: id}
    });
  }

  openReporteAsistencia(): void {
    this.dialogRef7 = this.dialog.open(ModalReporteAsistenciaComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openActualizarEvento(eventoId: number): void {
    this.dialogRef8 = this.dialog.open(ModalActualizarEventoComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { eventoId: eventoId}
    });
  }

  openListBirthday(id: number): void {
    this.dialogRef9 = this.dialog.open(ModalListBirthdayComponent, {
      width: '90%',
      maxWidth: '680px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { id: id}
    });
  }

  openModalInitSesion(): void {
    this.dialogRef10 = this.dialog.open(ModalInitSesionComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openReporteInvitados(): void {
    this.dialogRef11 = this.dialog.open(ModalReportInvitadosComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openReporteInvitadosUsuario(): void {
    this.dialogRef12 = this.dialog.open(ModalReportInvitadosUsuarioComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openModalMail(id: number): void {
    this.dialogRef13 = this.dialog.open(ModalMailConfigurationComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { id: id}
    });
  }

  openModalAsistencia(): void {
    this.dialogRef14 = this.dialog.open(ModalAsistenciaComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openModalInvitadosPortero(): void {
    this.dialogRef15 = this.dialog.open(ModalListaInvitadosComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }


  openViewMail(id: number): void {
    this.dialogRef16 = this.dialog.open(ModalViewMailComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { id: id}
    });
  }

  openValidationEvento(eventoId: number): void {
    this.dialogRef17 = this.dialog.open(ModalValidationEventComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { eventoId: eventoId}
    });
  }



  cerrarModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  cerrarModalQr(): void {
    if (this.dialogRef2) {
      this.dialogRef2.close();
    }
  }

  cerrarViewQr(): void {
    if (this.dialogRef3) {
      this.dialogRef3.close();
    }
  }

  cerrarDetalleEvento(): void {
    if (this.dialogRef4) {
      this.dialogRef4.close();
    }
  }

  cerrarModalBan(): void {
    if (this.dialogRef5) {
      this.dialogRef5.close();
    }
  }

  cerrarModalActualizarUser(): void {
    if (this.dialogRef6) {
      this.dialogRef6.close();
    }
  }

  cerrarModalAsistencia(): void {
    if (this.dialogRef7) {
      this.dialogRef7.close();
    }
  }

  cerrarModalActualizarEvento(): void {
    if (this.dialogRef8) {
      this.dialogRef8.close();
    }
  }

  cerrarListBirthday(): void {
    if (this.dialogRef9) {
      this.dialogRef9.close();
    }
  }

  cerrarInitSesion(): void {
    if (this.dialogRef10) {
      this.dialogRef10.close();
    }
  }

  cerrarModalInvitados(): void {
    if (this.dialogRef11) {
      this.dialogRef11.close();
    }
  }

  cerrarModalInvitadosUsuario(): void {
    if (this.dialogRef12) {
      this.dialogRef12.close();
    }
  }

  cerrarModalMail(): void {
    if (this.dialogRef13) {
      this.dialogRef13.close();
    }
  }

  cerrarModalAsistenciaPortero(): void {
    if (this.dialogRef14) {
      this.dialogRef14.close();
    }
  }

  cerrarModalInvitadosPortero(): void {
    if (this.dialogRef15) {
      this.dialogRef15.close();
    }
  }

  cerrarModalViewMail(): void {
    if (this.dialogRef16) {
      this.dialogRef16.close();
    }
  }

  cerrarValidationEvento(): void {
    if (this.dialogRef17) {
      this.dialogRef17.close();
    }
  }




}
