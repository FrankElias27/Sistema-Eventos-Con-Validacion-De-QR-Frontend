import { UserService } from 'src/app/services/user.service';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


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
      this.router.navigate(['/admin']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin']);
    }
  }

  public goToAdmin() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/create-admin-sistema']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/create-admin-sistema']);
    }
  }

  public goToOperario() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/create-admin']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/create-admin']);
    }
  }

  public goToPortero() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/create-portero']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/create-portero']);
    }
  }

  public goToCliente() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/create-cliente']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/create-cliente']);
    }
  }

  public goToAdmin2() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/view-admins-sistema']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/view-admins-sistema']);
    }
  }

  public goToOperario2() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/view-admins']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/view-admins']);
    }
  }

  public goToPortero2() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/view-porteros']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/view-porteros']);
    }
  }

  public goToCliente2() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/view-usuarios']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/view-usuarios']);
    }
  }

  public goToEventos() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/eventos']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/eventos']);
    }
  }

  public goToValidate() {
    this.router.navigate(['/admin/validar']);
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }

  public goToHistorial() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/view-historial']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/view-historial']);
    }
  }

  public goToList() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/view-listas']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/view-listas']);
    }
  }

  public goToBirthday() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/birthday']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/birthday']);
    }
  }

  public goToReport() {
    const isMobile = window.innerWidth <= 768; // O el tamaño que definas como límite
    if (isMobile) {
      this.router.navigate(['/admin/reportes']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/admin/reportes']);
    }
  }

}

