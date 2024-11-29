import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/Home/usuario.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-welcome-junior',
  templateUrl: './welcome-junior.component.html',
  styleUrls: ['./welcome-junior.component.css']
})
export class WelcomeJuniorComponent implements OnInit {

  user: Usuario | null = null;
  isLoggedIn = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser() as Usuario;


    // Comprobar si el usuario está logueado
    this.isLoggedIn = this.loginService.isLoggedIn();

    // Suscribirse al cambio de estado de autenticación
    this.loginService.loginStatusSubjec.asObservable().subscribe(data => {
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser() as Usuario;
    });

  }
}
