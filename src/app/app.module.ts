import { HttpClientModule } from '@angular/common/http';
import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { WelcomeeComponent } from './pages/user/welcomee/welcomee.component';
import { ViewReportesComponent } from './pages/admin/view-reportes/view-reportes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DatePipe, registerLocaleData } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ViewEventosComponent } from './pages/admin/view-eventos/view-eventos.component';
import { ModalAddEventosComponent } from './pages/admin/modal-add-eventos/modal-add-eventos.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { ModalQrComponent } from './pages/user/modal-qr/modal-qr.component';
import { ModalViewQrComponent } from './pages/user/modal-view-qr/modal-view-qr.component';
import { ValidateQrComponent } from './pages/admin/validate-qr/validate-qr.component';
import { ModalDetalleEventosComponent } from './pages/admin/modal-detalle-eventos/modal-detalle-eventos.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxTimepickerModule } from 'ngx-timepicker';
import {MatRadioModule} from '@angular/material/radio';
import { SignupAdminComponent } from './pages/admin/signup-admin/signup-admin.component';
import { SignupPorteroComponent } from './pages/admin/signup-portero/signup-portero.component';
import { SignupClienteComponent } from './pages/admin/signup-cliente/signup-cliente.component';
import { ViewAdminsComponent } from './pages/admin/view-admins/view-admins.component';
import { ModalBanUserComponent } from './pages/admin/modal-ban-user/modal-ban-user.component';
import { ModalActualizarUserComponent } from './pages/admin/modal-actualizar-user/modal-actualizar-user.component';
import { ViewUsuariosComponent } from './pages/admin/view-usuarios/view-usuarios.component';
import { ViewPorterosComponent } from './pages/admin/view-porteros/view-porteros.component';
import { HistorialAsistenciaComponent } from './pages/admin/historial-asistencia/historial-asistencia.component';
import { ModalReporteAsistenciaComponent } from './pages/admin/modal-reporte-asistencia/modal-reporte-asistencia.component';

import { MyBirthdayComponent } from './pages/my-birthday/my-birthday.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { BirthdayComponent } from './pages/admin/birthday/birthday.component';

import { ModalActualizarEventoComponent } from './pages/admin/modal-actualizar-evento/modal-actualizar-evento.component';
import { ModalListBirthdayComponent } from './pages/admin/modal-list-birthday/modal-list-birthday.component';
import { EditInviteDialogComponent } from './pages/admin/edit-invite-dialog/edit-invite-dialog.component';
import { ViewListasComponent } from './pages/admin/view-listas/view-listas.component';
import { ModalInitSesionComponent } from './pages/modal-init-sesion/modal-init-sesion.component';
import { ModalReportInvitadosComponent } from './pages/admin/modal-report-invitados/modal-report-invitados.component';
import { ModalReportInvitadosUsuarioComponent } from './pages/admin/modal-report-invitados-usuario/modal-report-invitados-usuario.component';
import { CapitalizePipe } from './capitalize.pipe';
import { VerificationComponent } from './pages/verification/verification.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { ModalMailConfigurationComponent } from './pages/admin/modal-mail-configuration/modal-mail-configuration.component';
import { SignupAdminSistemaComponent } from './pages/admin/signup-admin-sistema/signup-admin-sistema.component';
import { ViewSistemasComponent } from './pages/admin/view-sistemas/view-sistemas.component';
import { DashboardPorteroComponent } from './pages/portero/dashboard-portero/dashboard-portero.component';
import { WelcomePorteroComponent } from './pages/portero/welcome-portero/welcome-portero.component';
import { SidebarPorteroComponent } from './pages/portero/sidebar-portero/sidebar-portero.component';
import { ValidatePorteroComponent } from './pages/portero/validate-portero/validate-portero.component';
import { HistorialPorteroComponent } from './pages/portero/historial-portero/historial-portero.component';
import { ReportesPorteroComponent } from './pages/portero/reportes-portero/reportes-portero.component';
import { ModalAsistenciaComponent } from './pages/portero/modal-asistencia/modal-asistencia.component';
import { ModalListaInvitadosComponent } from './pages/portero/modal-lista-invitados/modal-lista-invitados.component';
import { DashboardJuniorComponent } from './pages/admin-junior/dashboard-junior/dashboard-junior.component';
import { SidebarJuniorComponent } from './pages/admin-junior/sidebar-junior/sidebar-junior.component';
import { WelcomeJuniorComponent } from './pages/admin-junior/welcome-junior/welcome-junior.component';
import { ViewPorteroComponent } from './pages/admin-junior/view-portero/view-portero.component';
import { ModalViewMailComponent } from './pages/admin-junior/modal-view-mail/modal-view-mail.component';
import { ViewClientesComponent } from './pages/admin-junior/view-clientes/view-clientes.component';
import { EventosEvaclubComponent } from './pages/admin-junior/eventos-evaclub/eventos-evaclub.component';
import { ValidateQrsComponent } from './pages/admin-junior/validate-qrs/validate-qrs.component';
import { HistorialJuniorComponent } from './pages/admin-junior/historial-junior/historial-junior.component';
import { ListBirthdayJuniorComponent } from './pages/admin-junior/list-birthday-junior/list-birthday-junior.component';
import { BirthdayJuniorComponent } from './pages/admin-junior/birthday-junior/birthday-junior.component';
import { ReportesJuniorComponent } from './pages/admin-junior/reportes-junior/reportes-junior.component';
import { MapEvaclubComponent } from './pages/map-evaclub/map-evaclub.component';
import { ModalValidationEventComponent } from './pages/modal-validation-event/modal-validation-event.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    WelcomeeComponent,
    ViewReportesComponent,
    SignupComponent,
     ViewEventosComponent,
     ModalAddEventosComponent,
     ModalQrComponent,
     ModalViewQrComponent,
     ValidateQrComponent,
     ModalDetalleEventosComponent,
     SignupAdminComponent,
     SignupPorteroComponent,
     SignupClienteComponent,
     ViewAdminsComponent,
     ModalBanUserComponent,
     ModalActualizarUserComponent,
     ViewUsuariosComponent,
     ViewPorterosComponent,
     HistorialAsistenciaComponent,
     ModalReporteAsistenciaComponent,

     MyBirthdayComponent,
     ContactoComponent,
     MyListComponent,
     BirthdayComponent,

     ModalActualizarEventoComponent,
     ModalListBirthdayComponent,
     EditInviteDialogComponent,
     ViewListasComponent,
     ModalInitSesionComponent,
     ModalReportInvitadosComponent,
     ModalReportInvitadosUsuarioComponent,
     CapitalizePipe,
     VerificationComponent,
     PasswordResetComponent,
     PasswordChangeComponent,
     ModalMailConfigurationComponent,
     SignupAdminSistemaComponent,
     ViewSistemasComponent,
     DashboardPorteroComponent,
     WelcomePorteroComponent,
     SidebarPorteroComponent,
     ValidatePorteroComponent,
     HistorialPorteroComponent,
     ReportesPorteroComponent,
     ModalAsistenciaComponent,
     ModalListaInvitadosComponent,
     DashboardJuniorComponent,
     SidebarJuniorComponent,
     WelcomeJuniorComponent,
     ViewPorteroComponent,
     ModalViewMailComponent,
     ViewClientesComponent,
     EventosEvaclubComponent,
     ValidateQrsComponent,
     HistorialJuniorComponent,
     ListBirthdayJuniorComponent,
     BirthdayJuniorComponent,
     ReportesJuniorComponent,
     MapEvaclubComponent,
     ModalValidationEventComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    MatAutocompleteModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSlideToggleModule,
    NgxTimepickerModule,
    MatRadioModule,
  ],
  providers: [authInterceptorProviders,DatePipe,{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    // Registrar el locale
    registerLocaleData(localeEs, 'es');
  }
 }
