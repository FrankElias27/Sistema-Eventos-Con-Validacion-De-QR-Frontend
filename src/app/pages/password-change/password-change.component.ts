import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  public isPasswordVisible = false;
  public isPasswordVisible2 = false;

  code: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParamMap.get('code') || '';
  }

  get passwordStrength() {
    if (this.newPassword !== this.confirmPassword) {
      return 'No coincide';
    }

    const password = this.newPassword || '';
    if (password.length < 8) {
      return 'Débil';
    }
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Fuerte';
    }
    return 'Moderada';
  }


  get passwordStrengthWidth() {
    switch (this.passwordStrength) {
      case 'Fuerte':
        return '100%';
      case 'Moderada':
        return '50%';
      case 'No coincide':
        return '0%';
      default:
        return '25%';
    }
  }

  onChangePassword() {

    if (!this.newPassword && !this.confirmPassword) {
      Swal.fire('¡Atención!', 'Las contraseñas no pueden estar vacías.', 'warning');
      return;
    }


    if (this.newPassword !== this.confirmPassword) {
      Swal.fire('¡Atención!', 'Las contraseñas no coinciden.', 'warning');
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

    this.userService.changePassword(this.code, this.newPassword).subscribe(
      response => {
        Swal.fire('Éxito', response.message, 'success');
        this.router.navigate(['/login']);
      },
      error => {
        const errorMessage = error.error?.error || 'Ocurrió un error inesperado.';
        Swal.fire('¡Atención!', errorMessage, 'warning');
      }
    );
  }

}
