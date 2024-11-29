import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { LoginData } from 'src/app/Models/Home/logindata.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isPasswordVisible = false;

  loginData: LoginData = {
    username: '',
    password: '',
  };

  constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.loginData.username.trim() === '' || this.loginData.username.trim() == null) {
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: 'El nombre de usuario es requerido !!',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (this.loginData.password.trim() === '' || this.loginData.password.trim() == null) {
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: 'La contraseña es requerida !!',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          if (this.loginService.getUserRole() === 'ROLE_ADMIN') {
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubjec.next(true);
          } else if (this.loginService.getUserRole() === 'ROLE_USUARIO') {
            this.router.navigate(['home']);
            this.loginService.loginStatusSubjec.next(true);
          } else if (this.loginService.getUserRole() === 'ROLE_PORTERO') {
            this.router.navigate(['portero']);
            this.loginService.loginStatusSubjec.next(true);
          } else if (this.loginService.getUserRole() === 'ROLE_ADMIN-JUNIOR') {
            this.router.navigate(['evaclub']);
            this.loginService.loginStatusSubjec.next(true);
          } else {
            this.loginService.logout();
          }
        });
      },
      (error) => {
        let errorMessage = 'Detalles inválidos, vuelva a intentar !!';


        if (error.error && error.error.mensaje) {
          errorMessage = error.error.mensaje;
        } else if (error.status === 0) {
          errorMessage = 'El servidor se encuentra en mantenimiento. Por favor, inténtelo más tarde. :D';
        }


        Swal.fire({
          icon: 'warning',
        title: '¡Atención!',
          text: errorMessage,
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

}
