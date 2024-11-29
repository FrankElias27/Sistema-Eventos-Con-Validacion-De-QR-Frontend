import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { PorteroService } from 'src/app/services/portero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-asistencia',
  templateUrl: './modal-asistencia.component.html',
  styleUrls: ['./modal-asistencia.component.css']
})
export class ModalAsistenciaComponent implements OnInit {

  EventoID: string | null = null;
  eventos: any[] = [];
  eventosControl = new FormControl();
  filteredEventos!: Observable<any[]>;

  constructor(
    private ModalService: ModalService,
    private eventosService: PorteroService,
    private ReporteService: PorteroService
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
    this.EventoID = selectedEvento.eventoId;
  }

  closeModal() {
    this.ModalService.cerrarModalAsistenciaPortero();
  }



  descargarReporteAsistenciaPDF() {
    if (this.EventoID) {
      this.ReporteService.descargarReporteAsistencia(this.EventoID, 'PDF').subscribe(
        (data: Blob) => {
          this.descargarArchivo(data, 'reporte-asistencia.pdf');
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
          this.descargarArchivoExcel(data, 'reporte-asistencia.xlsx');
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

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  descargarArchivoExcel(data: Blob, fileName: string) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
