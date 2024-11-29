import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { icon, Map, marker, tileLayer } from 'leaflet';
import { EventosService } from 'src/app/services/eventos.service';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';
import { RegistroService } from 'src/app/services/registro.service';
import { Usuario } from 'src/app/Models/Home/usuario.model';
import { Registro } from 'src/app/Models/enums/registro.enum';
import { Evento } from 'src/app/Models/Home/evento.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {
  isLoggedIn = false;
  user: Usuario | null = null;
  eventos: Evento[] = [];
  datosCargados = false;

  constructor(
    public login: LoginService,
    private viewportScroller: ViewportScroller,
    private eventosService: ClienteService,
    private modalService: ModalService,
    private registroService: ClienteService
  ) { }

  ngOnInit(): void {
    this.user = this.login.getUser() as Usuario;
    this.isLoggedIn = this.login.isLoggedIn();

    this.login.loginStatusSubjec.asObservable().subscribe(data => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser() as Usuario;

      if (this.isLoggedIn) {
        this.obtenerEventosActivos();
      }
    });

    if (this.isLoggedIn) {
      this.obtenerEventosActivos();
    }
  }

  //EVENTOS
  private obtenerEventosActivos(): void {
    this.eventosService.obtenerEventosActivos().subscribe(
      (data: Evento[]) => {
        this.eventos = data;
        this.datosCargados = true;

        this.eventos.forEach((evento: Evento) => {
          if (this.user) {
            this.registroService.verificarAsistencia(evento.eventoId, this.user.id).subscribe(asistenciaConfirmada => {

              evento.estadoRegistro = asistenciaConfirmada ? Registro.CONFIRMADO : Registro.NOCONFIRMADO;
            });
          }
        });
      },
      (error) => {
        this.datosCargados = true;
      }
    );
}


  //MODAL
  abrirModalQr(eventoId: number): void {
    this.modalService.openQR(eventoId);
  }

  //MODAL
  abrirModalValidation(eventoId: number): void {
    this.modalService.openValidationEvento(eventoId);
  }

  //MODAL

  abrirModalVerQr(eventoId: number): void {
    this.modalService.openViewQR(eventoId);
  }

  //MODAL

  abrirModalInitSesion(): void {
    this.modalService.openModalInitSesion();
  }

  handleCardClick(evento: any) {
    if (evento.visibilidad === 'NORMAL') {
      if (evento.estadoRegistro !== 'CONFIRMADO') {
        this.abrirModalValidation(evento.eventoId);
      } else if (evento.estadoRegistro === 'CONFIRMADO') {
        this.abrirModalVerQr(evento.eventoId);
      }
    }
  }


  //SCROLL
  scrollToEventosCentrado(): void {
    const eventosSection = document.getElementById('eventos');
    if (eventosSection) {
      const { top, height } = eventosSection.getBoundingClientRect();
      const scrollY = window.scrollY + top - (window.innerHeight / 2 - height / 2) - 100;

      window.scrollTo({
        top: scrollY,
        left: (window.innerWidth / 2) - (eventosSection.getBoundingClientRect().width / 2),
        behavior: 'smooth'
      });
    }
  }

  //MAPA
  ngAfterViewInit(): void {
    const map = new Map('map').setView([-14.086702, -75.757159], 15);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const customIcon = icon({
        iconUrl: '../../../assets/Login.webp',
        iconSize: [25, 25],
        iconAnchor: [12, 8]
    });

    const markerInstance = marker([-14.086702, -75.757159], { icon: customIcon }).addTo(map);

    markerInstance.bindPopup('<span style="color: purple;">Eva Club Ica</span>').openPopup();
}
}
