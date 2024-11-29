import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../../services/eventos.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { RegistroService } from '../../../services/registro.service';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-historial-asistencia',
  templateUrl: './historial-asistencia.component.html',
  styleUrls: ['./historial-asistencia.component.css']
})
export class HistorialAsistenciaComponent implements OnInit {

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

  constructor(private eventosService: EventosService, private registroService: RegistroService) { }

  ngOnInit(): void {
    this.eventosService.obtenerEventosActivos().subscribe(
      (datos: any[]) => {
        this.eventos = datos;
      },
      (error) => {
        // Manejo de errores
      }
    );
  }

  onEnter(): void {
    if (this.selectedEvento) {
      this.VizualizarRegistro();
    }
  }

  VizualizarRegistro(): void {
    // Usa la propiedad selectedEvento directamente
    if (this.selectedEvento && this.selectedEvento.eventoId) {
      const eventoId = this.selectedEvento.eventoId;
      this.registroService.getRegistroEventosByEventoNombre(eventoId, this.currentPage, this.size)
        .subscribe(response => {
          this.dataSource.data = response.content;
          this.totalElements = response.totalElements;
        }, error => {
          // Manejo de errores
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
