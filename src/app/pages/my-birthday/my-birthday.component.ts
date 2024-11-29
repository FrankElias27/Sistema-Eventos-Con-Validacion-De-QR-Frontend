import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { BirthdayService } from '../../services/birthday.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { Birthday } from 'src/app/Models/Home/birthday.model';
import { Usuario } from 'src/app/Models/Home/usuario.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-my-birthday',
  templateUrl: './my-birthday.component.html',
  styleUrls: ['./my-birthday.component.css']
})
export class MyBirthdayComponent implements OnInit {
  isLoggedIn = false;

  birthday: Birthday = {
    descripcion: '',
    createdDate: new Date(),
    usuario: { id: 0 }
  };

  name: string = '';
  dni: string = '';
  message: string = '';
  isReadOnly: boolean = true;
  user: Usuario | null = null;
  maxAttempts: number = 3;
  invites: Array<{ name: string; dni: string }> = [];

  constructor(
    private loginService: LoginService,
    private birthdayService: ClienteService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser() as Usuario;

    this.isLoggedIn = this.loginService.isLoggedIn();

    this.loginService.loginStatusSubjec.asObservable().subscribe(data => {
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser() as Usuario;
    });

  }

  // MODAL
  abrirModalInitSesion(): void {
    this.modalService.openModalInitSesion();
  }


  // AÑADIR INVITADO A TABLA
  addInvite() {
    const namePattern = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/;
    const dniPattern = /^\d{8}$/;

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

    this.invites.push({ name: this.name, dni: this.dni });
    this.name = '';
    this.dni = '';
}

  // QUITAR INVITADO
  removeInvite(index: number) {
    this.invites.splice(index, 1);
  }

  // ENVIAR LISTA
enviarLista() {
  Swal.fire({
    title: '¿Está seguro?',
    text: 'Solo podrá enviar la lista una vez este año. Revise bien antes de continuar.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, enviar lista',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      const usuario = this.user;
      const cumpleañosConUsuario = this.invites.map(invite => ({
        nombre: invite.name,
        dni: invite.dni,
        createdDate: new Date(),
        año: new Date().getFullYear(),
        usuario: { id: usuario?.id, nombre: usuario?.nombre }
      }));

      this.birthdayService.agregarCumpleaños(cumpleañosConUsuario).subscribe({
        next: (respuesta) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Lista de Invitados Enviada y Recibida con éxito!!',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/my-list-evaclub']);
            }
          });
          this.invites = [];
        },
        error: (error) => {
          const errorMessage = error.error.mensaje || 'Error desconocido';
          Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: errorMessage,
          });
        }
      });
    }
  });
}
}
