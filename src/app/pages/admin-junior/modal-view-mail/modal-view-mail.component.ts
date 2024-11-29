import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EmaillogService } from 'src/app/services/emaillog.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-view-mail',
  templateUrl: './modal-view-mail.component.html',
  styleUrls: ['./modal-view-mail.component.css']
})
export class ModalViewMailComponent implements OnInit {

  isActive: boolean = false; // Estado inicial del evento
  usuarioId = 0;

  usuario: any = [];

  constructor(private ModalService:ModalService,private UserService:UserService,private EmaillogService:EmaillogService,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.usuarioId = this.data.id;
    this.UserService.obtenerUsuario(this.usuarioId).subscribe(
      (data) => {
        this.usuario = data;
        this.isActive = this.usuario.verified;
      },
      (error) => {
      }
    )
  }

  closeModal() {
    this.ModalService.cerrarModalViewMail();
  }

  public toggleEventStatus(event: MatSlideToggleChange) {
    this.isActive = event.checked;
  }

  actualizarDatos() {
    // Crear objeto simplificado con solo los datos necesarios para la actualización
    const id = this.usuarioId;
    const enabled = this.isActive;


    this.UserService.actualizarUsuarioVerified(id, enabled).subscribe(
      (data) => {
        Swal.fire('Configuración guardada', 'La configuración ha sido actualizada con éxito', 'success').then(
          () => {
            this.ModalService.cerrarModalViewMail();
            location.reload();
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar la configuración', 'error');
      }
    );
  }



  deleteLogsHoy(event: MouseEvent) {
    event.stopPropagation(); // Evita que el evento se propague
    event.preventDefault();  // Evita el comportamiento predeterminado

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar los logs de email de hoy para este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.EmaillogService.eliminarRegistrosDeHoy(this.usuarioId).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Eliminado!',
              text: `Se han eliminado los logs de hoy.`, // Mensaje de éxito
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
          },
          error: (error) => {
            const errorMessage = error.error || 'Ocurrió un error desconocido.';
            Swal.fire({
              title: 'Error!',
              text: `Ocurrió un error al eliminar los logs: ${errorMessage}`,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          },
        });
      }
    });
}

}
