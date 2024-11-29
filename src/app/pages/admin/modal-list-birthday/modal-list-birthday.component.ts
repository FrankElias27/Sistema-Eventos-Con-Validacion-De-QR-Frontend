import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { MAT_DIALOG_DATA,MatDialog,MatDialogRef  } from '@angular/material/dialog';
import { BirthdayService } from 'src/app/services/birthday.service';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';
import { EditInviteDialogComponent } from '../edit-invite-dialog/edit-invite-dialog.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-list-birthday',
  templateUrl: './modal-list-birthday.component.html',
  styleUrls: ['./modal-list-birthday.component.css']
})
export class ModalListBirthdayComponent implements OnInit {

  name: string = '';
  dni: string = '';
  invites: { name: string, dni: string }[] = [];
  usuarioId = 0;
  invitados: any[] = [];
  usuario: any;
  isEditModalOpen = false;
  selectedInvite: any;


  constructor(private ModalService:ModalService,@Inject(MAT_DIALOG_DATA) public data: any,private birthdayService:BirthdayService,
               private UserService:UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.usuarioId = this.data.id;
    this.obtenerInvitadosPorUsuario(this.usuarioId);
    this.obtenerUsuario(this.usuarioId);
  }

  closeModal() {
    this.ModalService.cerrarListBirthday();
  }

  obtenerInvitadosPorUsuario(usuarioId: number): void {
    this.birthdayService.obtenerInvitadosPorUsuario(usuarioId).subscribe({
      next: (data) => {
        this.invitados = data;
      },
      error: (error) => {

      }
    });
  }

  obtenerUsuario(usuarioId: any): void {
    this.UserService.obtenerUsuario(usuarioId).subscribe({
      next: (data) => {
        this.usuario = data; // Asigna los datos del usuario a la propiedad
      },
      error: (error) => {

      }
    });
  }

  openEditModal(invite: any) {
    const dialogRef = this.dialog.open(EditInviteDialogComponent, {
      data: { invite: { ...invite } } // Haciendo una copia
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.invitados.findIndex(i => i.birthdayId === invite.birthdayId); // Usando birthdayId

        if (index > -1) {
          this.invitados[index] = { ...result }; // Actualiza con una copia del resultado
        }
      }
    });
  }

  actualizarLista() {
    this.birthdayService.actualizarCumpleaños(this.usuarioId, this.invitados).subscribe({
        next: (response) => {

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Lista de cumpleaños actualizado exitosamente.', // Mensaje de éxito
            }).then(() => {
                this.closeModal(); // Cierra el modal después de la actualización
            });
        },
        error: (error) => {

            const errorMessage = error.error.mensaje || 'Error desconocido';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage, // Muestra el mensaje de error
            });
        }
    });
}

addInvite() {
  const namePattern = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/; // Solo letras y espacios
  const dniPattern = /^\d{8}$/; // Exactamente 8 dígitos

  if (!this.name || !this.dni) {
      Swal.fire({
          icon: 'warning',
          title: '¡Atención!',
          text: 'Por favor, completa ambos campos.',
          confirmButtonText: 'Aceptar'
      });
      return;
  }

  if (!namePattern.test(this.name)) {
      Swal.fire({
          icon: 'warning',
          title: '¡Atención!',
          text: 'El nombre solo puede contener letras.',
          confirmButtonText: 'Aceptar'
      });
      return;
  }

  if (!dniPattern.test(this.dni)) {
      Swal.fire({
          icon: 'warning',
          title: '¡Atención!',
          text: 'El DNI debe contener exactamente 8 dígitos numéricos.',
          confirmButtonText: 'Aceptar'
      });
      return;
  }

  // Si todas las validaciones pasan, agregar el invitado
  this.invitados.push({ nombre: this.name, dni: this.dni });



  // Reiniciar los campos
  this.name = '';
  this.dni = '';
}

removeInvite(index: number) {
  Swal.fire({
      title: "¿Estás seguro?",
      text: "Seguro que deseas eliminar a este invitado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
  }).then((result) => {
      if (result.isConfirmed) {
          this.invitados.splice(index, 1); // Eliminar el invitado del array
          Swal.fire("Invitado eliminado!", "", "success");
      } else {
          Swal.fire("El invitado no fue eliminado.", "", "info");
      }
  });
}

}
