import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EventosService } from '../../../services/eventos.service';
import { ReporteService } from '../../../services/reporte.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-modal-reporte-asistencia',
  templateUrl: './modal-reporte-asistencia.component.html',
  styleUrls: ['./modal-reporte-asistencia.component.css']
})
export class ModalReporteAsistenciaComponent implements OnInit {

  EventoID: string | null = null;
  eventos: any[] = [];
  eventosControl = new FormControl();
  filteredEventos!: Observable<any[]>;

  constructor(
    private ModalService: ModalService,
    private eventosService: EventosService,
    private ReporteService: ReporteService
  ) { }

  ngOnInit(): void {
    this.eventosService.listarEventos().subscribe(
      (datos: any[]) => {
        this.eventos = datos;

        this.filteredEventos = this.eventosControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.nombre),
          map(nombre => {

            return nombre ? this._filterEventos(nombre) : this.eventos.slice();
          })
        );
      },
      (error) => {

      }
    );
  }

  private _filterEventos(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();
    return this.eventos.filter(evento => evento.nombre.toLowerCase().includes(filterValue));
  }

  displayFn(evento: any): string {
    return evento && evento.nombre ? evento.nombre : '';
  }

  onEventSelected(event: any) {
    const selectedEvento = event.option.value;
    this.EventoID = selectedEvento.eventoId; // Usa eventoId en lugar de id
  }

  closeModal() {
    this.ModalService.cerrarModalAsistencia();
  }



  descargarReporteAsistenciaPDF() {
    if (this.EventoID) {
      this.ReporteService.descargarReporteAsistencia(this.EventoID, 'PDF').subscribe(
        (data: Blob) => {
          this.descargarArchivo(data, 'reporte-asistencia.pdf'); // Puedes usar un nombre predeterminado
        },
        (error) => {
          console.error('Error al descargar el archivo PDF', error);
        }
      );
    } else {
      console.error('No se ha seleccionado ningún evento.');
    }
  }

  descargarReporteAsistenciaEXCEL() {
    if (this.EventoID) {
      this.ReporteService.descargarReporteAsistencia(this.EventoID, 'EXCEL').subscribe(
        (data: Blob) => {
          this.descargarArchivoExcel(data, 'reporte-asistencia.xlsx'); // Puedes usar un nombre predeterminado
        },
        (error) => {
          console.error('Error al descargar el archivo PDF', error);
        }
      );
    } else {
      console.error('No se ha seleccionado ningún evento.');
    }
  }

  descargarArchivo(data: Blob, fileName: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace temporal y hacer clic en él para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Aquí estableces el nombre del archivo
    document.body.appendChild(link);
    link.click();

    // Limpiar
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  descargarArchivoExcel(data: Blob, fileName: string) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Nombre del archivo
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
