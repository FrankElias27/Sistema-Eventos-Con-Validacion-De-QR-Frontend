import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  email: string = '';
  message: string = '';

  constructor(private mailService: MailService) {}

  ngOnInit(): void {
  }


  onRequestReset(event: Event) {
    event.preventDefault();

    if (!this.email) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'La casilla no puede estar vacía.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Debes digitar un email correcto.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    this.mailService.requestPasswordReset(this.email).subscribe(
        response => {

            Swal.fire({
                icon: 'success',
                title: 'Correo de restablecimiento enviado con éxito!',
                text: response.message,
                confirmButtonText: 'Aceptar'
            });
        },
        error => {

            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: error.error.error,
                confirmButtonText: 'Aceptar'
            });
        }
    );
}

}
