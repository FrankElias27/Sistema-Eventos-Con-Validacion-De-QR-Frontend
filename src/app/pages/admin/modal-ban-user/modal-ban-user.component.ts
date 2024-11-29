import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EventosService } from 'src/app/services/eventos.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-ban-user',
  templateUrl: './modal-ban-user.component.html',
  styleUrls: ['./modal-ban-user.component.css']
})
export class ModalBanUserComponent implements OnInit {

  isActive: boolean = false; // Estado inicial del evento
  usuarioId = 0;

  usuario: any = [];

  constructor(private ModalService:ModalService,@Inject(MAT_DIALOG_DATA) public data: any,private UserService:UserService) { }

  ngOnInit(): void {
    this.usuarioId = this.data.id;
    this.UserService.obtenerUsuario(this.usuarioId).subscribe(
      (data) => {
        this.usuario = data;
        this.isActive = this.usuario.enabled;
      },
      (error) => {
      }
    )
  }

  public toggleEventStatus(event: MatSlideToggleChange) {
    this.isActive = event.checked;
  }

  closeModal() {
    this.ModalService.cerrarModalBan();
  }

  actualizarDatos() {
    // Crear objeto simplificado con solo los datos necesarios para la actualización
    const id = this.usuarioId;
    const enabled = this.isActive;


    this.UserService.actualizarUsuario(id, enabled).subscribe(
      (data) => {
        Swal.fire('Configuración guardada', 'La configuración ha sido actualizada con éxito', 'success').then(
          () => {
            this.ModalService.cerrarModalBan();
            location.reload();
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar la configuración', 'error');
      }
    );
  }


}
