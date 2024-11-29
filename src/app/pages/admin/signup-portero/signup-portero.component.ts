import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Usuario } from 'src/app/Models/Home/usuario.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-portero',
  templateUrl: './signup-portero.component.html',
  styleUrls: ['./signup-portero.component.css']
})
export class SignupPorteroComponent implements OnInit {

  isPasswordVisible = false;

  public user: Usuario = {
    id: 0, // Esto se asegura de que id esté presente
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dni: '',
    fechaNacimiento: null,
    email: '',
    telefono: '',
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void { }

  //CONTRASEÑA
  get passwordStrength() {
    const password = this.user.password || '';
    const allowedSpecialChars = /[!@#$%^&*()\-_+={}[\]:;"'<>,.?/\\|`~]/; // Remover el guion bajo

    if (password.length < 8) {
        return 'Débil';
    }

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);

    // Recoger caracteres especiales correctamente
    const specialCharsFound = password.split('').filter(char => allowedSpecialChars.test(char));
    const hasSpecialChar = specialCharsFound.length > 0;


    if (hasLowercase && hasUppercase && hasDigit && hasSpecialChar) {
        return 'Fuerte';
    }

    return 'Moderada';
}

  //CONTRASEÑA
  get passwordStrengthWidth() {
    switch (this.passwordStrength) {
      case 'Fuerte':
        return '100%';
      case 'Moderada':
        return '50%';
      default:
        return '25%';
    }
  }

  //EDAD
  calculateAge(birthdate: Date | null): number {
    if (!birthdate) return 0; // Retorna 0 si no hay fecha
    return moment().diff(moment(birthdate), 'years'); // Calcula la edad con Moment.js
  }

  formSubmit() {
    if (!this.user.nombre) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa tu nombre para continuar.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!this.user.apellidoPaterno) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa tu apellido paterno para continuar.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!this.user.apellidoMaterno) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa tu apellido materno para continuar.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!this.user.dni) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa tu dni para continuar.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const dniPattern = /^\d{8}$/;
    if (!dniPattern.test(this.user.dni)) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'El DNI debe tener exactamente 8 dígitos numéricos.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!this.user.telefono) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa tu número de teléfono.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const telefonoPattern = /^\d{9}$/;
    if (!telefonoPattern.test(this.user.telefono)) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'El número de teléfono debe tener exactamente 9 dígitos numéricos.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!this.user.fechaNacimiento) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa tu fecha de nacimiento.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const age = this.calculateAge(this.user.fechaNacimiento);
    if (age < 18) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Debes tener al menos 18 años para registrarte.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!this.user.email) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa tu dirección de correo electrónico.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.user.email)) {
        Swal.fire({
            icon: 'warning',
            title: '¡Oops!',
            text: 'Por favor, asegúrate de que el correo electrónico sea válido para poder recuperar tu cuenta.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!this.user.username) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa tu username o nombre de usuario.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!this.user.password) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa tu contraseña',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (this.passwordStrength !== 'Fuerte') {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'La contraseña debe ser fuerte para continuar. Incluye mayúsculas, minúsculas, números y símbolos.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    this.user.nombre = this.user.nombre.trim();
    this.user.apellidoPaterno = this.user.apellidoPaterno.trim();
    this.user.apellidoMaterno = this.user.apellidoMaterno.trim();
    this.user.dni = this.user.dni.trim();
    this.user.telefono = this.user.telefono.trim();
    this.user.email = this.user.email.trim();
    this.user.username = this.user.username.trim();
    this.user.password = this.user.password.trim();

    // Llama al servicio con el modelo de usuario
    this.userService.añadirPortero(this.user).subscribe(
        (data) => {
            Swal.fire('Usuario guardado', 'Usuario registrado con éxito.', 'success').then(
                () => {
                  location.reload();
                }
            );
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
