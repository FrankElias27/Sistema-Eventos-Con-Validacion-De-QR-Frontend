import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrService } from '../../../services/qr.service';
import { LoginService } from 'src/app/services/login.service';
import { RegistroService } from '../../../services/registro.service';
import { ModalService } from '../../../services/modal.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import 'moment-timezone';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-modal-qr',
  templateUrl: './modal-qr.component.html',
  styleUrls: ['./modal-qr.component.css']
})
export class ModalQrComponent implements OnInit {
  qrCodeImage: string | null = null;
  errorMessage: string | null = null;
  user: any;
  dni: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { eventoId: string },
              private qrService: ClienteService,
              private loginService: LoginService,
              private registroService: ClienteService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    if (this.user) {
      this.dni = this.user.dni;
      this.generateQRCode();
    } else {
      this.showError('User not found');
    }

  }

  async generateQRCode(): Promise<void> {
    if (!this.user || !this.dni) {
      this.showError('Missing user information');
      return;
    }

    const userId = this.user.id;

    try {
      this.qrCodeImage = await this.qrService.generateQRCode(this.data.eventoId, userId, this.dni);
    } catch (error) {

      const err = error as { status?: number };
      let errorMessage = 'Ocurrió un error inesperado.';

      if (err.status === 400) {
        errorMessage = 'Límite de códigos QR alcanzado para este evento.';
        this.closeModal();
      } else if (err.status === 500) {
        errorMessage = 'Hubo un problema interno en el servidor. Por favor, inténtelo de nuevo más tarde.';
        this.closeModal();
      }

      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos!',
        text: errorMessage,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed) {

            location.reload();
        }
    });
  }
  }

  async confirmAsistencia(): Promise<void> {
    if (!this.user || !this.dni || !this.qrCodeImage) {
      this.showError('Missing user or QR code information');
      return;
    }

    const userId = this.user.id;
    const formattedDate = moment.tz('America/Bogota').format('YYYY-MM-DDTHH:mm:ss') + 'Z';

    const qrData = {
      valorQR: this.qrCodeImage,
      fechaGeneracion: formattedDate
    };

    try {

      const qrResponse = await this.qrService.agregarQR(qrData).toPromise();


      const registro = {
        fechaRegistro: formattedDate,
        estadoRegistro: "CONFIRMADO",
        estadoAsistencia: "REGISTRADO",
        evento: { eventoId: this.data.eventoId },
        usuario: { id: userId },
        qrCode: qrResponse
      };

      await this.registroService.agregarRegistro(registro).toPromise();


      await this.showSuccess('Has obtenido un código QR para este evento.');


      this.closeModal();
      window.location.reload();

    } catch (error: any) {

      let errorMessage = 'Error inesperado';

      if (error?.status) {
        if (error.status === 400) {
          errorMessage = 'Error guardando el código QR';
        } else if (error.status === 500) {
          errorMessage = 'Error en el servidor, por favor inténtelo de nuevo más tarde';
        }
      }

      this.showError(errorMessage);
    }
  }
  closeModal() {
    this.modalService.cerrarModalQr();
  }

  showSuccess(message: string): Promise<void> {
    return Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
      confirmButtonText: 'Aceptar'
    }).then(() => {});
  }

  showError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'Aceptar'
    });
  }
}
