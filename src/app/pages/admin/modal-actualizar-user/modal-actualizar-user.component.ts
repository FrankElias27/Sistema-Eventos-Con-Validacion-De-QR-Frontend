import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-actualizar-user',
  templateUrl: './modal-actualizar-user.component.html',
  styleUrls: ['./modal-actualizar-user.component.css']
})
export class ModalActualizarUserComponent implements OnInit {


  isActive: boolean = false;
  usuarioId = 0;
  fechaSeleccionada: Date | null = null;

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dni: '',
    fechaNacimiento: null,
    email: '',
    telefono: ''
  }

  usuario: any = [];

  constructor(private modalService: ModalService, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.usuarioId = this.data.id;
    this.userService.obtenerUsuario(this.usuarioId).subscribe(
      (data) => {
        this.usuario = data;
        this.usuario.fechaNacimiento = moment(this.usuario.fechaNacimiento).toDate();
        this.isActive = this.usuario.enabled;
      },
      (error) => {
      }
    )
  }

  closeModal() {
    this.modalService.cerrarModalActualizarUser();
  }

  calculateAge(birthdate: Date): number {
    return moment().diff(moment(birthdate), 'years');
  }

  formSubmit() {
    const requiredFields = [
        { field: 'username', message: 'El nombre de usuario es requerido !!' },
        { field: 'password', message: 'La contraseña es requerida !!' },
        { field: 'nombre', message: 'El nombre es requerido !!' },
        { field: 'apellidoPaterno', message: 'El apellido paterno es requerido !!' },
        { field: 'apellidoMaterno', message: 'El apellido materno es requerido !!' },
        { field: 'dni', message: 'El DNI es requerido !!' },
        { field: 'fechaNacimiento', message: 'La fecha de nacimiento es requerida !!' },
        { field: 'email', message: 'El email es requerido !!' },
        { field: 'telefono', message: 'El teléfono es requerido !!' },
    ];

    for (const { field, message } of requiredFields) {
        if (!this.usuario[field]) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: message,
                confirmButtonText: 'Aceptar'
            });
            return;
        }
    }

    // Validación del DNI
    const dniPattern = /^\d{8}$/;
    if (!dniPattern.test(this.usuario.dni)) {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'El DNI debe contener exactamente 8 dígitos numéricos !!',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Validación de la edad
    const age = this.calculateAge(this.usuario.fechaNacimiento);
    if (age < 18) {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'Debe tener al menos 18 años para registrarse !!',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Validación de formato del email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.usuario.email)) {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'Email Inválido. El Email es esencial para poder recuperar su cuenta en el futuro.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Validación del teléfono
    const telefonoPattern = /^\d{9}$/;
    if (!telefonoPattern.test(this.usuario.telefono)) {
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'El teléfono debe contener exactamente 9 dígitos numéricos !!',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Llamada al servicio para actualizar los detalles del usuario
    const fechaParaEnviar = moment(this.usuario.fechaNacimiento).format('YYYY-MM-DD');
    this.userService.actualizarDetallesUsuario({ ...this.usuario, fechaNacimiento: fechaParaEnviar }).subscribe(
        (data) => {
            Swal.fire('Usuario actualizado', 'Usuario actualizado con éxito en el sistema', 'success').then(() => {
                this.closeModal();
                location.reload();
            });
        },
        (error) => {
            const errorMessage = error.error?.message || 'Ha ocurrido un error en el sistema !!';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage
            });
        }
    );
}
}
