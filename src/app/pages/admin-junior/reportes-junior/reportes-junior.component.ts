import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reportes-junior',
  templateUrl: './reportes-junior.component.html',
  styleUrls: ['./reportes-junior.component.css']
})
export class ReportesJuniorComponent implements OnInit {

  constructor(private reportService: ReporteService,private http: HttpClient, private ModalService:ModalService) { }

  ngOnInit(): void {
  }

  descargarClientesPDF() {
    this.reportService.descargarReporteClientes('PDF').subscribe(
      (data: Blob) => {
        this.descargarArchivo(data, 'reporte-clientes.pdf'); // Puedes usar un nombre predeterminado
      },
      (error) => {
        console.error('Error al descargar el archivo PDF', error);
      }
    );

}

descargarClientesEXCEL() {
  this.reportService.descargarReporteClientes('EXCEL').subscribe(
    (data: Blob) => {
      this.descargarArchivoExcel(data, 'reporte-clientes.xlsx'); // Puedes usar un nombre predeterminado
    },
    (error) => {
      console.error('Error al descargar el archivo EXCEL', error);
    }
  );

}

  abrirModalAsistencia(): void {
    this.ModalService.openReporteAsistencia();
  }

  abrirModalInvitados(): void {
    this.ModalService.openReporteInvitados();
  }

  abrirModalInvitadosUsuario(): void {
    this.ModalService.openReporteInvitadosUsuario();
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


