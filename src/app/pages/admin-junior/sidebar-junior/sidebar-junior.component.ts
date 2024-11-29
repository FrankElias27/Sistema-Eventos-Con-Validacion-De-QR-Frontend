import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar-junior',
  templateUrl: './sidebar-junior.component.html',
  styleUrls: ['./sidebar-junior.component.css']
})
export class SidebarJuniorComponent implements OnInit {

  conteoCumpleanos: number | undefined;

  constructor(public login:LoginService,private router: Router,
    private UserService:UserService) { }

  ngOnInit(): void {

    this.obtenerConteoCumpleanosHoy();

  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

  obtenerConteoCumpleanosHoy(): void {
    this.UserService.contarUsuariosCumpleanosHoy().subscribe(
      (count: number) => {
        this.conteoCumpleanos = count;
      },
      (error: any) => {
      }
    );
  }

  public goToHome() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/evaclub']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/evaclub']);
    }
  }

  public goToClientes() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/evaclub/view-usuarios']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/evaclub/view-usuarios']);
    }
  }

  public goToEventos() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/evaclub/eventos']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/evaclub/eventos']);
    }
  }

  public goToValidate() {
    this.router.navigate(['/evaclub/validar']);
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }

  public goToHistorial() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/evaclub/view-historial']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/evaclub/view-historial']);
    }
  }

  public goToList() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/evaclub/view-listas']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/evaclub/view-listas']);
    }
  }

  public goToBirthday() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/evaclub/birthday']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/evaclub/birthday']);
    }
  }

  public goToReport() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/evaclub/reportes']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/evaclub/reportes']);
    }
  }

}

