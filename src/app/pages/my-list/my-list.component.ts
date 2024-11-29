import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { BirthdayService } from 'src/app/services/birthday.service';
import { Usuario } from 'src/app/Models/Home/usuario.model';
import { Invitado } from 'src/app/Models/Home/invitado.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  isLoggedIn = false;
  user: Usuario | null = null;
  invitados: Invitado[] = [];

  constructor(private loginService: LoginService, private birthdayService: ClienteService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser() as Usuario;

    this.isLoggedIn = this.loginService.isLoggedIn();

    this.loginService.loginStatusSubjec.asObservable().subscribe(data => {
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser() as Usuario;

      if (this.isLoggedIn) {
        this.obtenerInvitados();
      }
    });

    if (this.isLoggedIn) {
      this.obtenerInvitados();
    }
  }

  //OBTENER INVITADO
  obtenerInvitados(): void {
    this.birthdayService.obtenerInvitados().subscribe({
      next: (invitados: Invitado[]) => {
        this.invitados = invitados;
      },
      error: (error) => {
      }
    });
  }
}
