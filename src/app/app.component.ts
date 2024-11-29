import { Component, OnInit, HostListener  } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Map, tileLayer } from 'leaflet';
import { filter } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isHomePage = false;
  isLoginPage = false;
  isSignupPage = false;
  isPasswordResetPage = false;
  title = 'sistema-examenes-frontend';

  constructor(private router: Router,private loginService: LoginService) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {

      const currentUrl = this.router.url;
      this.isLoginPage = currentUrl === '/login';
      this.isSignupPage = currentUrl === '/signup';
      this.isPasswordResetPage = currentUrl === '/password-reset';

    });

    initFlowbite();
  }





}
