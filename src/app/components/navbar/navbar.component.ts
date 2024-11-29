import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../Models/Home/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user: Usuario | null = null;
  hasUserRole: boolean = false;
  hasAdminRole: boolean = false;
  hasAdminJuniorRole: boolean = false;
  hasPorteroRole: boolean = false;
  conteoCumpleanos: number | undefined;

  isMenuOpen = false;

  constructor(
    public login: LoginService,
    private renderer: Renderer2,
    private el: ElementRef,
    private cd: ChangeDetectorRef,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser() as Usuario;

    if (this.isLoggedIn && this.user) {

      this.hasUserRole = this.user?.authorities?.some((auth) => auth.authority === 'ROLE_USUARIO') || false;
      this.hasPorteroRole = this.user?.authorities?.some((auth) => auth.authority === 'ROLE_PORTERO') || false;
      this.hasAdminJuniorRole = this.user?.authorities?.some((auth) => auth.authority === 'ROLE_ADMIN-JUNIOR') || false;
      this.hasAdminRole = this.user?.authorities?.some((auth) => auth.authority === 'ROLE_ADMIN') || false;

      if (this.hasAdminRole || this.hasAdminJuniorRole) {
        this.obtenerConteoCumpleanosHoy();
      }
    }

    this.login.loginStatusSubjec.asObservable().subscribe(data => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser() as Usuario;

      if (this.isLoggedIn && this.user) {

        this.hasUserRole = this.user?.authorities?.some((auth) => auth.authority === 'ROLE_USUARIO') || false;
        this.hasPorteroRole = this.user?.authorities?.some((auth) => auth.authority === 'ROLE_PORTERO') || false;
        this.hasAdminJuniorRole = this.user?.authorities?.some((auth) => auth.authority === 'ROLE_ADMIN-JUNIOR') || false;
        this.hasAdminRole = this.user?.authorities?.some((auth) => auth.authority === 'ROLE_ADMIN') || false;


        if (this.hasAdminRole || this.hasAdminJuniorRole) {
          this.obtenerConteoCumpleanosHoy();
        }
      }


      setTimeout(() => {
        window.location.reload();
      }, 10);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  //CERRRAR SESION
  public logout() {
    this.login.logout();
    this.router.navigate(['/home']);
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }

  //HOME
  public goToHome() {
    this.router.navigate(['/home']);
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }

  //BIRTHDAY
  public goToMap() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.router.navigate(['/map-evaclub']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['/map-evaclub']);
    }
  }


  //CONTACT
  public goToContact() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.router.navigate(['/contact-evaclub']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } else {
      this.router.navigate(['//contact-evaclub']);
    }
  }

  //CUMPLE
  public goToCumple() {
    this.router.navigate(['/admin/birthday']);
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }

  //CUMPLE
  public goToCumpleUser() {
    this.router.navigate(['/evaclub/birthday']);
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }

  //OBTENERCUMPLE
  obtenerConteoCumpleanosHoy(): void {
    this.userService.contarUsuariosCumpleanosHoy().subscribe(
      (count: number) => {
        this.conteoCumpleanos = count;
      },
      (error: any) => {
        console.error('Error al obtener el conteo de cumpleaños', error);
      }
    );
  }
}
