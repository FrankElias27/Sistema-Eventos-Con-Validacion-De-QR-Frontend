import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ModalService } from '../../../services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-sistemas',
  templateUrl: './view-sistemas.component.html',
  styleUrls: ['./view-sistemas.component.css']
})
export class ViewSistemasComponent implements OnInit {

  usuarios: any[] = [];
  displayedColumns: string[] = ['Nombre', 'Username', 'Dni', 'Email', 'Telefono','Estado', 'Acciones'];
  currentPage: number = 0;
  searchTerm: string = '';
  pageSize: number = 10; // Puedes ajustar esto según tu necesidad


  constructor(private UserService:UserService,private ModalService:ModalService) { }

  ngOnInit(): void {
    this.getAdmins(this.currentPage); // Inicializa con la primera página
  }


  getAdmins(page: number): void {
    if (this.searchTerm) {
      this.searchAdmins();
    } else {
      this.UserService.getAdminsSistema(page)
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
    this.getAdmins(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getAdmins(this.currentPage - 1);
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


  abrirModalActualizar(userId: any): void {
    this.ModalService.openActualizarUser(userId);
  }

  searchAdmins(): void {
    this.UserService.buscarSistemaPorNombre(this.searchTerm, this.currentPage, this.pageSize)
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
