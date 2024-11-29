import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { PorteroService } from 'src/app/services/portero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-lista-invitados',
  templateUrl: './modal-lista-invitados.component.html',
  styleUrls: ['./modal-lista-invitados.component.css']
})
export class ModalListaInvitadosComponent implements OnInit {

  clientes: any[] = [];
  filteredClientes!: Observable<any[]>;
  ClientesControl = new FormControl();
  selectedClienteId: string ='';

  constructor(private ModalService: ModalService,private ReporteService: PorteroService,private UserService:PorteroService) { }

  ngOnInit(): void {
    this.UserService.listarClientes().subscribe(
      (datos: any[]) => {
        this.clientes = datos;

        this.filteredClientes = this.ClientesControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : this.displayFn(value)),
          map(nombreCompleto => nombreCompleto ? this._filterClientes(nombreCompleto) : this.clientes.slice()) // Mostrar todos si está vacío
        );
      },
      (error) => {
        console.error('Error al listar clientes', error);
      }
    );
  }

  private _filterClientes(nombreCompleto: string): any[] {
    const filterValue = nombreCompleto.toLowerCase();
    return this.clientes.filter(cliente => {
      const fullName = this.displayFn(cliente).toLowerCase();
      return fullName.includes(filterValue);
    });
  }

  displayFn(cliente: any): string {
    if (cliente) {
      let fullName = cliente.nombre || '';
      if (cliente.apellidoPaterno) {
        fullName += ' ' + cliente.apellidoPaterno;
      }
      if (cliente.apellidoMaterno) {
        fullName += ' ' + cliente.apellidoMaterno;
      }
      return fullName.trim();
    } else {
      return '';
    }
  }

  onClienteSeleccionado(cliente: any) {
    this.selectedClienteId = cliente.id;
  }

    descargarReporteInvitadosPDF() {
      if (this.selectedClienteId) {
          this.ReporteService.descargarReporteInvitadosPorUsuario(this.selectedClienteId, 'PDF').subscribe(
              (data: Blob) => {
                  this.descargarArchivo(data, 'reporte-invitados.pdf');
              },
              (error) => {
                  console.error('Error al descargar el archivo', error);
              }
          );
      } else {
          console.error('El cliente debe estar seleccionado.');
      }
  }

  descargarReporteInvitadosEXCEL() {
      if (this.selectedClienteId) {
          this.ReporteService.descargarReporteInvitadosPorUsuario(this.selectedClienteId, 'EXCEL').subscribe(
              (data: Blob) => {
                  this.descargarArchivoExcel(data, 'reporte-invitados.xlsx');
              },
              (error) => {
                  console.error('Error al descargar el archivo', error);
              }
          );
      } else {
          console.error('El cliente debe estar seleccionado.');
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

  closeModal() {
    this.ModalService.cerrarModalInvitadosPortero();
  }

}

