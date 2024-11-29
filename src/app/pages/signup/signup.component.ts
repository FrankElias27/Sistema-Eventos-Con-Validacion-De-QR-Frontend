import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/Home/usuario.model';
import * as moment from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isPasswordVisible = false;
  loading: boolean = false;

  public user: Usuario = {
    id: 0,
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
    const allowedSpecialChars = /[!@#$%^&*()\-_+={}[\]:;"'<>,.?/\\|`~]/;

    if (password.length < 8) {
        return 'Débil';
    }

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);

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
    if (!birthdate) return 0;
    return moment().diff(moment(birthdate), 'years');
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
            text: 'La barra debe estar en verde. Incluye mayúsculas, minúsculas, números y símbolos en la contraseña.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    this.loading = true;

    this.user.nombre = this.user.nombre.trim();
    this.user.apellidoPaterno = this.user.apellidoPaterno.trim();
    this.user.apellidoMaterno = this.user.apellidoMaterno.trim();
    this.user.dni = this.user.dni.trim();
    this.user.telefono = this.user.telefono.trim();
    this.user.email = this.user.email.trim();
    this.user.username = this.user.username.trim();
    this.user.password = this.user.password.trim();

    this.userService.añadirUsuarioPorRegistro(this.user).subscribe(
        (data) => {
          this.loading = false;
            Swal.fire('Codigo de verificación enviado con éxito! ', 'Por favor, revise su bandeja de entrada o correo no deseado.', 'success').then(
                () => {
                  this.router.navigate(['/login']);
                }
            );
        },
        (error) => {
          this.loading = false;
            const errorMessage = error.error?.message || 'Ha ocurrido un error en el sistema !!';
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: errorMessage
            });
        }
    );
}
}
