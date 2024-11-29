import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PorteroService } from 'src/app/services/portero.service';

@Component({
  selector: 'app-historial-portero',
  templateUrl: './historial-portero.component.html',
  styleUrls: ['./historial-portero.component.css']
})
export class HistorialPorteroComponent implements OnInit {

  eventos: any[] = [];
  eventosControl = new FormControl();
  filteredEventos!: Observable<any[]>;
  displayedColumns: string[] = ['Imagen', 'Evento', 'Fecha de Registro', 'Portero', 'Usuario', 'Asistencia'];
  currentPage: number = 0;

  page: number = 0;
  size: number = 10;
  registros: any[] = [];
  totalElements: number = 0;
  dataSource = new MatTableDataSource<any>();
  selectedEvento: any;

  constructor(private eventosService: PorteroService, private registroService: PorteroService) { }

  ngOnInit(): void {
    this.eventosService.obtenerEventosActivos().subscribe(
      (datos: any[]) => {
        this.eventos = datos;
      },
      (error) => {
      }
    );
  }

  onEnter(): void {
    if (this.selectedEvento) {
      this.VizualizarRegistro();
    }
  }

  VizualizarRegistro(): void {
    if (this.selectedEvento && this.selectedEvento.eventoId) {
      const eventoId = this.selectedEvento.eventoId;
      this.registroService.getRegistroEventosByEventoNombre(eventoId, this.currentPage, this.size)
        .subscribe(response => {
          this.dataSource.data = response.content;
          this.totalElements = response.totalElements;
        }, error => {
        });
    }
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.totalElements / this.size) - 1) {
      this.currentPage++;
      this.VizualizarRegistro();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.VizualizarRegistro();
    }
  }

}
