import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { map, Observable, startWith } from 'rxjs';
import { EventosService } from 'src/app/services/eventos.service';
import { ModalService } from 'src/app/services/modal.service';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-modal-report-invitados',
  templateUrl: './modal-report-invitados.component.html',
  styleUrls: ['./modal-report-invitados.component.css']
})
export class ModalReportInvitadosComponent implements OnInit {

  fechaInicio: string ='';
  fechaFin: string = '';

  constructor(
    private ModalService: ModalService,
    private ReporteService: ReporteService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.ModalService.cerrarModalInvitados();
  }

  descargarReporteInvitadosPDF() {
    if (this.fechaInicio && this.fechaFin) {
      const inicio = moment(this.fechaInicio).format('YYYY-MM-DD');
      const fin = moment(this.fechaFin).format('YYYY-MM-DD');

      this.ReporteService.descargarReporteInvitados(inicio, fin, 'PDF').subscribe(
        (data: Blob) => {
          this.descargarArchivo(data, `reporte-invitados.pdf`);
        },
        (error) => {
          console.error('Error al descargar el archivo', error);
        }
      );
    } else {
      console.error('Las fechas de inicio y fin deben estar seleccionadas.');
    }
}

descargarReporteInvitadosEXCEL() {
    if (this.fechaInicio && this.fechaFin) {
      const inicio = moment(this.fechaInicio).format('YYYY-MM-DD');
      const fin = moment(this.fechaFin).format('YYYY-MM-DD');

      this.ReporteService.descargarReporteInvitados(inicio, fin, 'EXCEL').subscribe(
        (data: Blob) => {
          this.descargarArchivoExcel(data, `reporte-invitados.xlsx`);
        },
        (error) => {
          console.error('Error al descargar el archivo', error);
        }
      );
    } else {
      console.error('Las fechas de inicio y fin deben estar seleccionadas.');
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

