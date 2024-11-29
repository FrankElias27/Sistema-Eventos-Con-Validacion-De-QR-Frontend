import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';
import { LoginService } from 'src/app/services/login.service';
import { PorteroService } from 'src/app/services/portero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validate-portero',
  templateUrl: './validate-portero.component.html',
  styleUrls: ['./validate-portero.component.css']
})
export class ValidatePorteroComponent implements AfterViewInit {
  qrCodeText: string = '';
  validationMessage: string | null = null;
  validationIcon: string = 'error';
  loading: boolean = false;
  private html5QrCode: Html5Qrcode | null = null;
  private scannerRunning: boolean = false;

  constructor(private qrCodeService: PorteroService,private RegistroService:PorteroService,private LoginService:LoginService) { }

  ngAfterViewInit(): void {

    this.html5QrCode = new Html5Qrcode("reader");
  }

  onEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.validate();
  }

  async validate() {
    this.loading = true;

    try {
        const { event, user, dni } = this.parseQRCodeData(this.qrCodeText);

        if (!event || !user || !dni) {
            throw new Error('Los datos del código QR son inválidos o incompletos.');
        }

        const base64QRCode = await this.qrCodeService.generateQRCodeConfirmed(event, user, dni).toPromise();

        if (!base64QRCode) {
            throw new Error('El código QR generado es inválido.');
        }

        const eventoId = Number(event);
        const usuarioId = Number(user);

        if (isNaN(eventoId) || isNaN(usuarioId)) {
            throw new Error('Los parámetros eventoId o usuarioId no son válidos.');
        }


        const isUsed = await this.qrCodeService.verificarQRCode(base64QRCode).toPromise();
        if (isUsed) {
            throw new Error('Ya fue usado');
        }

        const registroEvento = await this.RegistroService.obtenerRegistroEvento(eventoId, usuarioId).toPromise();


        if (!registroEvento) {
            throw new Error('No se encontró el registro del evento.');
        }


        const usuario = this.LoginService.getUser();
        const portero = usuario
            ? `${usuario.nombre || ''} ${usuario.apellidoPaterno || ''}`.trim()
            : 'Desconocido';


         await this.RegistroService.actualizarRegistroEvento(registroEvento, portero, 'ASISTIO').toPromise();


        await this.qrCodeService.validateQRCode(base64QRCode).toPromise();


        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Validación completada y registro actualizado.',
            confirmButtonText: 'Aceptar'
        });


        this.validationMessage = 'Validación completada y registro actualizado.';
        this.validationIcon = 'check_circle';

        this.qrCodeText = '';

    } catch (error: any) {
        console.error('Error:', error);

        let errorMessage = 'Error de validación. QR con datos inválidos. ';

        if (error.status === 400) {
            errorMessage = 'El código QR tiene un formato similar pero es inválido.';
        } else if (error.status === 409) {
            errorMessage = 'El código QR ya ha sido validado. Revisa el Historial';
        } else if (error.message.includes('generar código QR')) {
            errorMessage = 'Error al generar el código QR. Por favor, intente de nuevo.';
        } else if (error.message.includes('registro del evento')) {
            errorMessage = 'No se pudo actualizar el registro del evento.';
        } else if (error.message.includes('Ya fue usado')) {
          errorMessage = 'El código QR ya ha sido validado. Revisa el Historial';
      }

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
            confirmButtonText: 'Aceptar'
        });

        this.validationMessage = errorMessage;
        this.validationIcon = 'error';

        this.qrCodeText = '';

    } finally {
        this.loading = false;
    }
}

  private getRegistroEvento(eventoId: number, usuarioId: number): Promise<any> {
    return this.RegistroService.obtenerRegistroEvento(eventoId, usuarioId).toPromise();
  }

  parseQRCodeData(data: string): { event: string, user: string, dni: string } {
    let event: string = '';
    let user: string = '';
    let dni: string = '';

    const parts = data.split(';');

    parts.forEach(part => {
      const [key, value] = part.split(':');
      if (key && value) {
        switch (key) {
          case 'EventID':
            event = value;
            break;
          case 'UserID':
            user = value;
            break;
          case 'Dni':
            dni = value;
            break;
        }
      }
    });

    return { event, user, dni };
  }

  startScan() {

    if (this.html5QrCode) {
      if (this.scannerRunning) {
        this.stopScan();
      }


      const readerElement = document.getElementById("reader");
      if (!readerElement) {
        console.error('Element with ID "reader" not found');
        return;
      }


      readerElement.style.display = "block";
      readerElement.style.width = "100%";
      readerElement.style.height = "auto";

      this.html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 400, height: 400 }  },
        (decodedText: string) => {
          this.qrCodeText = decodedText;
          this.stopScan();
          this.closeModal();

        },
        (errorMessage: string) => {
          console.log(`Error en el escaneo: ${errorMessage}`);
        }
      ).then(() => {
        this.scannerRunning = true;
      }).catch(err => {
        console.log(`Error al iniciar el escaneo: ${err}`);
      });
    }
  }

  stopScan() {
    if (this.html5QrCode && this.scannerRunning) {
      this.html5QrCode.stop().then(() => {
        const readerElement = document.getElementById("reader");
        if (readerElement) {
          readerElement.style.display = "block";
        }
        this.scannerRunning = false;
      }).catch(err => {
        console.log(`Error al detener el escaneo: ${err}`);
      });
    }
  }


  closeModal() {

    const button = document.querySelector('button[data-modal-toggle="defaultModal"]');


    if (button) {

        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });


        button.dispatchEvent(clickEvent);
    } else {
        console.warn('El botón de cierre del modal no se encontró.');
    }
}


}
