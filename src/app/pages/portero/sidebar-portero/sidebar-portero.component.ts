import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar-portero',
  templateUrl: './sidebar-portero.component.html',
  styleUrls: ['./sidebar-portero.component.css']
})
export class SidebarPorteroComponent implements OnInit {

  conteoCumpleanos: number | undefined;

  constructor(public login:LoginService,private router: Router,
    private UserService:UserService) { }

  ngOnInit(): void {

  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }


  public goToHome() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.router.navigate(['/portero']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/portero']);
    }
  }


  public goToValidate() {
    this.router.navigate(['/portero/validar']);
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }

  public goToHistorial() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.router.navigate(['/portero/view-historial']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/portero/view-historial']);
    }
  }

  public goToReport() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.router.navigate(['/portero/reportes']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/portero/reportes']);
    }
  }

}
