import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/Home/usuario.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-welcome-portero',
  templateUrl: './welcome-portero.component.html',
  styleUrls: ['./welcome-portero.component.css']
})
export class WelcomePorteroComponent implements OnInit {

  user: Usuario | null = null;
  isLoggedIn = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser() as Usuario;



    this.isLoggedIn = this.loginService.isLoggedIn();


    this.loginService.loginStatusSubjec.asObservable().subscribe(data => {
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser() as Usuario;
    });

  }

  public goToValidate() {
    this.router.navigate(['/portero/validar']);
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }
}
