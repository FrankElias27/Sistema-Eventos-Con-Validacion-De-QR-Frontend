import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { EventosService } from '../../../services/eventos.service';
import { ModalService } from '../../../services/modal.service';
import { RegistroService } from '../../../services/registro.service';
import { Map, marker, tileLayer } from 'leaflet';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-welcomee',
  templateUrl: './welcomee.component.html',
  styleUrls: ['./welcomee.component.css']
})
export class WelcomeeComponent implements OnInit  {

  user: any = null;
  eventos: any = [];
  datosCargados: boolean = false;

  constructor(private viewportScroller: ViewportScroller,private loginService:LoginService,private EventosService:EventosService,private ModalService:ModalService,private RegistroService:RegistroService) { }

  ngOnInit(): void {



    this.user = this.loginService.getUser();

    this.EventosService.obtenerEventosActivos().subscribe(
      (data) => {
        this.eventos = data;
        console.log(this.eventos);

        this.datosCargados = true;


        this.eventos.forEach((evento: any) => {
          if (this.user) {
            this.RegistroService.verificarAsistencia(evento.eventoId, this.user.id).subscribe(asistenciaConfirmada => {
              evento.estadoRegistro = asistenciaConfirmada ? 'CONFIRMADO' : 'NOCONFIRMADO';
            });
          }
        });
      },
      (error) => {
        console.log(error);
        this.datosCargados = true;
      }
    );




  }

  abrirModalQr(eventoId:any): void {
    this.ModalService.openQR(eventoId);
  }

  abrirModalVerQr(eventoId:any): void {
    this.ModalService.openViewQR(eventoId);
  }

  scrollToEventos(): void {
    const eventosSection = document.getElementById('eventos');
    if (eventosSection) {
      eventosSection.scrollIntoView({ behavior: 'smooth' });


      setTimeout(() => {
        const cardActions = document.querySelectorAll('mat-card-actions');
        cardActions.forEach((element: Element) => {
          element.classList.add('highlight');

        });


        setTimeout(() => {
          cardActions.forEach((element: Element) => {
            element.classList.remove('highlight');
          });
        }, 3000);
      }, 500);
    }
  }

  scrollToEventosCentrado(): void {
    const eventosSection = document.getElementById('eventos');
    if (eventosSection) {
      eventosSection.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest'
      });
    }
  }



}
