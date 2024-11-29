import { Component, AfterViewInit } from '@angular/core';
import { QrService } from 'src/app/services/qr.service';
import Swal from 'sweetalert2';
import { Html5Qrcode } from 'html5-qrcode'; // Asegúrate de importar correctamente
import { RegistroService } from '../../../services/registro.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-validate-qr',
  templateUrl: './validate-qr.component.html',
  styleUrls: ['./validate-qr.component.css']
})
export class ValidateQrComponent implements AfterViewInit {
  qrCodeText: string = '';
  validationMessage: string | null = null;
  validationIcon: string = 'error'; // Default to error icon
  loading: boolean = false;
  private html5QrCode: Html5Qrcode | null = null;
  private scannerRunning: boolean = false;

  constructor(private qrCodeService: QrService,private RegistroService:RegistroService,private LoginService:LoginService) { }

  ngAfterViewInit(): void {
    // Inicializar el escáner después de que la vista se haya inicializado
    this.html5QrCode = new Html5Qrcode("reader");
  }

  onEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent; // Aserción de tipo
    keyboardEvent.preventDefault(); // Evita el comportamiento predeterminado
    this.validate(); // Llama a la función de validación
  }

  async validate() {
    this.loading = true;

    try {
        // Separar los datos del código QR
        const { event, user, dni } = this.parseQRCodeData(this.qrCodeText);

        // Asegúrate de que los datos del código QR se hayan extraído correctamente
        if (!event || !user || !dni) {
            throw new Error('Los datos del código QR son inválidos o incompletos.');
        }

        // Generar el código QR
        const base64QRCode = await this.qrCodeService.generateQRCodeConfirmed(event, user, dni).toPromise();

        // Verificar si base64QRCode no es undefined antes de validarlo
        if (!base64QRCode) {
            throw new Error('El código QR generado es inválido.');
        }

        // Convertir los valores a números
        const eventoId = Number(event);
        const usuarioId = Number(user);

        // Verificar si la conversión fue exitosa
        if (isNaN(eventoId) || isNaN(usuarioId)) {
            throw new Error('Los parámetros eventoId o usuarioId no son válidos.');
        }

        // Verificar si el QR ya ha sido utilizado
        const isUsed = await this.qrCodeService.verificarQRCode(base64QRCode).toPromise();
        if (isUsed) {
            throw new Error('Ya fue usado');
        }

        // Obtener el registro del evento
        const registroEvento = await this.RegistroService.obtenerRegistroEvento(eventoId, usuarioId).toPromise();

        // Verificar que se haya obtenido un registro válido
        if (!registroEvento) {
            throw new Error('No se encontró el registro del evento.');
        }

        // Obtener el nombre del portero o asignar 'Desconocido'
        const usuario = this.LoginService.getUser();
        const portero = usuario
            ? `${usuario.nombre || ''} ${usuario.apellidoPaterno || ''}`.trim()
            : 'Desconocido';

        // Actualizar el registroEvento con los nuevos datos usando el nuevo servicio
        await this.RegistroService.actualizarRegistroEvento(registroEvento, portero, 'ASISTIO').toPromise();


        // Solo si la actualización fue exitosa, validar el código QR
        await this.qrCodeService.validateQRCode(base64QRCode).toPromise();

        // Mostrar mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Validación completada y registro actualizado.',
            confirmButtonText: 'Aceptar'
        });

        // Actualizar el estado en la interfaz
        this.validationMessage = 'Validación completada y registro actualizado.';
        this.validationIcon = 'check_circle'; // Icono de éxito

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
        this.validationIcon = 'error'; // Icono de error

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
        this.stopScan(); // Detén el escaneo si ya está corriendo
      }

      // Asegúrate de que el elemento esté disponible y visible antes de manipularlo
      const readerElement = document.getElementById("reader");
      if (!readerElement) {
        console.error('Element with ID "reader" not found');
        return;
      }

      // Establece el tamaño del contenedor y asegúrate de que sea visible
      readerElement.style.display = "block";
      readerElement.style.width = "100%";
      readerElement.style.height = "auto";

      this.html5QrCode.start(
        { facingMode: "environment" }, // Usa la cámara trasera
        { fps: 10, qrbox: { width: 400, height: 400 }  }, // Configuración opcional
        (decodedText: string) => {
          this.qrCodeText = decodedText;
          this.stopScan(); // Detén el escaneo después de obtener el QR
          this.closeModal();

        },
        (errorMessage: string) => {
          console.log(`Error en el escaneo: ${errorMessage}`);
        }
      ).then(() => {
        this.scannerRunning = true; // Marca el escáner como en ejecución
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
          readerElement.style.display = "block"; // Ocultar el contenedor de la cámara
        }
        this.scannerRunning = false; // Marca el escáner como detenido
      }).catch(err => {
        console.log(`Error al detener el escaneo: ${err}`);
      });
    }
  }


  closeModal() {
    // Selecciona el botón que cierra el modal
    const button = document.querySelector('button[data-modal-toggle="defaultModal"]');

    // Verifica si el botón existe
    if (button) {
        // Crea un evento de clic
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });

        // Dispara el evento de clic en el botón
        button.dispatchEvent(clickEvent);
    } else {
        console.warn('El botón de cierre del modal no se encontró.');
    }
}


}
