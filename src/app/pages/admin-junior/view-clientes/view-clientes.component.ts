import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-clientes',
  templateUrl: './view-clientes.component.html',
  styleUrls: ['./view-clientes.component.css']
})
export class ViewClientesComponent implements OnInit {

  usuarios: any[] = [];
  displayedColumns: string[] = ['Nombre', 'Dni', 'Email', 'Telefono', 'Configuracion','Estado'];
  currentPage: number = 0;
  searchTerm: string = '';
  pageSize: number = 10; // Puedes ajustar esto según tu necesidad


  constructor(private UserService:UserService,private ModalService:ModalService) { }

  ngOnInit(): void {
    this.getUsuarios(this.currentPage); // Inicializa con la primera página
  }



  getUsuarios(page: number): void {
    if (this.searchTerm) {
      this.searchAdmins();
    } else {
      this.UserService.getUsuarios(page)
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
    this.getUsuarios(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getUsuarios(this.currentPage - 1);
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
    this.UserService.buscarClientePorNombre(this.searchTerm, this.currentPage, this.pageSize)
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
