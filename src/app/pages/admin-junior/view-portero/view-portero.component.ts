import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-portero',
  templateUrl: './view-portero.component.html',
  styleUrls: ['./view-portero.component.css']
})
export class ViewPorteroComponent implements OnInit {

  usuarios: any[] = [];
  displayedColumns: string[] = ['Nombre', 'Dni', 'Email', 'Telefono', 'Configuracion','Estado'];
  currentPage: number = 0;
  searchTerm: string = '';
  pageSize: number = 10; // Puedes ajustar esto según tu necesidad


  constructor(private UserService:UserService,private ModalService:ModalService) { }

  ngOnInit(): void {
    this.getPorteros(this.currentPage); // Inicializa con la primera página
  }



  getPorteros(page: number): void {
    if (this.searchTerm) {
      this.searchAdmins();
    } else {
      this.UserService.getPorteros(page)
        .subscribe(
          response => {
            this.usuarios = response.content; // Asigna el contenido de la página actual
            this.currentPage = response.number; // Actualiza la página actual
          },
          error => {
          }
        );
    }
  }

  nextPage(): void {
    this.getPorteros(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getPorteros(this.currentPage - 1);
    }
  }

  getEstadoText(enabled: boolean): string {
    return enabled ? 'Activo' : 'No Activo';
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


  abrirModalMail(userId: any): void {
    this.ModalService.openViewMail(userId);
  }

  searchAdmins(): void {
    this.UserService.buscarPorteroPorNombre(this.searchTerm, this.currentPage, this.pageSize)
      .subscribe(
        (response:any) => {
          this.usuarios = response.content; // Asigna el contenido de la búsqueda
          this.currentPage = response.number; // Actualiza la página actual si es necesario
        },
        error => {
        }
      );
  }




}
