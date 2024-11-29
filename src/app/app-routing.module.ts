import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { WelcomeeComponent } from './pages/user/welcomee/welcomee.component';
import { ViewReportesComponent } from './pages/admin/view-reportes/view-reportes.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ViewEventosComponent } from './pages/admin/view-eventos/view-eventos.component';
import { ValidateQrComponent } from './pages/admin/validate-qr/validate-qr.component';
import { SignupAdminComponent } from './pages/admin/signup-admin/signup-admin.component';
import { SignupPorteroComponent } from './pages/admin/signup-portero/signup-portero.component';
import { SignupClienteComponent } from './pages/admin/signup-cliente/signup-cliente.component';
import { ViewAdminsComponent } from './pages/admin/view-admins/view-admins.component';
import { ViewUsuariosComponent } from './pages/admin/view-usuarios/view-usuarios.component';
import { ViewPorterosComponent } from './pages/admin/view-porteros/view-porteros.component';
import { HistorialAsistenciaComponent } from './pages/admin/historial-asistencia/historial-asistencia.component';

import { MyBirthdayComponent } from './pages/my-birthday/my-birthday.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { BirthdayComponent } from './pages/admin/birthday/birthday.component';
import { ViewListasComponent } from './pages/admin/view-listas/view-listas.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { SignupAdminSistemaComponent } from './pages/admin/signup-admin-sistema/signup-admin-sistema.component';
import { ViewSistemasComponent } from './pages/admin/view-sistemas/view-sistemas.component';
import { DashboardPorteroComponent } from './pages/portero/dashboard-portero/dashboard-portero.component';
import { PorteroGuard } from './services/portero.guard';
import { WelcomePorteroComponent } from './pages/portero/welcome-portero/welcome-portero.component';
import { ValidatePorteroComponent } from './pages/portero/validate-portero/validate-portero.component';
import { HistorialPorteroComponent } from './pages/portero/historial-portero/historial-portero.component';
import { ReportesPorteroComponent } from './pages/portero/reportes-portero/reportes-portero.component';
import { DashboardJuniorComponent } from './pages/admin-junior/dashboard-junior/dashboard-junior.component';
import { JuniorGuard } from './services/junior.guard';
import { WelcomeJuniorComponent } from './pages/admin-junior/welcome-junior/welcome-junior.component';
import { ViewPorteroComponent } from './pages/admin-junior/view-portero/view-portero.component';
import { ViewClientesComponent } from './pages/admin-junior/view-clientes/view-clientes.component';
import { EventosEvaclubComponent } from './pages/admin-junior/eventos-evaclub/eventos-evaclub.component';
import { ValidateQrsComponent } from './pages/admin-junior/validate-qrs/validate-qrs.component';
import { HistorialJuniorComponent } from './pages/admin-junior/historial-junior/historial-junior.component';
import { ListBirthdayJuniorComponent } from './pages/admin-junior/list-birthday-junior/list-birthday-junior.component';
import { BirthdayJuniorComponent } from './pages/admin-junior/birthday-junior/birthday-junior.component';
import { ReportesJuniorComponent } from './pages/admin-junior/reportes-junior/reportes-junior.component';
import { MapEvaclubComponent } from './pages/map-evaclub/map-evaclub.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: '/home',
    pathMatch : 'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full'
  },
  {
    path:'map-evaclub',
    component : MapEvaclubComponent,
    pathMatch: 'full'
  },
  {
    path:'my-birthday-evaclub',
    component : MyBirthdayComponent,
    pathMatch: 'full'
  },
  {
    path:'my-list-evaclub',
    component : MyListComponent,
    pathMatch: 'full'
  },
  {
    path:'contact-evaclub',
    component : ContactoComponent,
    pathMatch: 'full'
  },
  { path: 'verify', component: VerificationComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'password-change', component: PasswordChangeComponent },
  {
    path:'admin',
    component:DashboardComponent,
    canActivate:[AdminGuard],
    children:[
        {
          path:'profile',
          component:ProfileComponent
        },
        {
          path:'',
          component:WelcomeComponent
        },
        {
          path:'reportes',
          component : ViewReportesComponent
        },
        {
          path:'eventos',
          component : ViewEventosComponent
        },
        {
          path:'validar',
          component : ValidateQrComponent
        },
        {
          path:'create-admin-sistema',
          component : SignupAdminSistemaComponent
        },
        {
          path:'create-admin',
          component : SignupAdminComponent
        },
        {
          path:'create-portero',
          component : SignupPorteroComponent
        },
        {
          path:'create-cliente',
          component : SignupClienteComponent
        },
        {
          path:'view-admins-sistema',
          component : ViewSistemasComponent
        },
        {
          path:'view-admins',
          component : ViewAdminsComponent
        },
        {
          path:'view-usuarios',
          component : ViewUsuariosComponent
        },
        {
          path:'view-porteros',
          component : ViewPorterosComponent
        },
        {
          path:'view-historial',
          component : HistorialAsistenciaComponent
        },
        {
          path:'birthday',
          component : BirthdayComponent
        },
        {
          path:'view-listas',
          component : ViewListasComponent
        },

    ]
  },
  {
    path:'portero',
    component:DashboardPorteroComponent,
    canActivate:[PorteroGuard],
    children:[
        {
          path:'',
          component:WelcomePorteroComponent
        },
        {
          path:'validar',
          component : ValidatePorteroComponent
        },
        {
          path:'view-historial',
          component : HistorialPorteroComponent
        },
        {
          path:'reportes',
          component : ReportesPorteroComponent
        },

    ]
  },
  {
    path:'evaclub',
    component:DashboardJuniorComponent,
    canActivate:[JuniorGuard],
    children:[
        {
          path:'',
          component:WelcomeJuniorComponent
        },
        {
          path:'view-usuarios',
          component : ViewClientesComponent
        },
        {
          path:'view-porteros',
          component : ViewPorteroComponent
        },
        {
          path:'eventos',
          component : EventosEvaclubComponent
        },
        {
          path:'validar',
          component : ValidateQrsComponent
        },
        {
          path:'view-historial',
          component : HistorialJuniorComponent
        },
        {
          path:'view-listas',
          component : ListBirthdayJuniorComponent
        },
        {
          path:'birthday',
          component : BirthdayJuniorComponent
        },
        {
          path:'reportes',
          component : ReportesJuniorComponent
        },

    ]
  },
  {
    path: 'user',
    component: HomeComponent,
    canActivate: [NormalGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
