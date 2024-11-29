import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-evaclub',
  templateUrl: './eventos-evaclub.component.html',
  styleUrls: ['./eventos-evaclub.component.css']
})
export class EventosEvaclubComponent implements OnInit {

  eventos: any[] = [];
  displayedColumns: string[] = ['Imagen', 'Evento', 'Fecha del Evento', 'Configuracion', 'Estado', 'Acciones'];
  currentPage: number = 0;



  constructor(private ModalService: ModalService, private EventosService: EventosService) { }

  ngOnInit(): void {
    this.getEventos(this.currentPage); // Inicializa con la primera página
  }



  getEventos(page: number): void {
    this.EventosService.getEventos(page)
      .subscribe(
        response => {
          this.eventos = response.content; // Asigna el contenido de la página actual
          this.currentPage = response.number; // Actualiza la página actual
        },
        error => {
        }
      );
  }

  nextPage(): void {
    this.getEventos(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getEventos(this.currentPage - 1);
    }
  }


  abrirAddEvento(): void {
    this.ModalService.openAddEvento();
  }

  abrirModalDetalle(eventoId: any): void {
    this.ModalService.openDetalleEvento(eventoId);
  }

  abrirModalActualizar(eventoId: any): void {
    this.ModalService.openActualizarEvento(eventoId);
  }

  getEstadoClass(enabled: boolean): string {
    switch (enabled) {
      case true:
        return 'activo';
      case false:
        return 'no-activo';
      default:
        return '';
    }
  }

  getEstadoText(enabled: boolean): string {
    return enabled ? 'Activo' : 'No Activo';
  }



  eliminarEvento(eventoId: any) {
    Swal.fire({
      title: 'Eliminar Evento',
      text: '¿Estás seguro de eliminar el Evento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.EventosService.eliminarEvento(eventoId).subscribe(
          (data) => {
            this.eventos = this.eventos.filter((evento: any) => evento.eventoId != eventoId);
            Swal.fire('Evento eliminado', 'El evento ha sido eliminado de la base de datos', 'success').then(
              (e) => {
                location.reload()
              });
          },
          (error) => {
            // Obtener el mensaje del error y mostrarlo
            const errorMessage = error.error?.message || 'Error al eliminar el evento';
            Swal.fire('Error', errorMessage, 'error');
          }
        );
      }
    });
  }
}

