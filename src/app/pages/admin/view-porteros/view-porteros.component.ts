import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-porteros',
  templateUrl: './view-porteros.component.html',
  styleUrls: ['./view-porteros.component.css']
})
export class ViewPorterosComponent implements OnInit {

  usuarios: any[] = [];
  displayedColumns: string[] = ['Nombre', 'Dni', 'Email', 'Telefono', 'Configuracion','Estado', 'Acciones'];
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

  abrirModalBan(userId: any): void {
    this.ModalService.openModalBan(userId);
  }

  abrirModalActualizar(userId: any): void {
    this.ModalService.openActualizarUser(userId);
  }

  abrirModalMail(userId: any): void {
    this.ModalService.openModalMail(userId);
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

  eliminarUsuario(id: any) {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: '¿Estás seguro de eliminar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserService.eliminarUsuario(id).subscribe(
          (data) => {
            this.usuarios = this.usuarios.filter((usuario: any) => usuario.id != id);
            Swal.fire('Usuario eliminado', 'El usuario ha sido eliminado de la base de datos', 'success').then(
              (e) => {
              });
          },
          (error) => {
            // Obtener el mensaje del error y mostrarlo
            const errorMessage = error.error?.message || 'Error al eliminar el usuario';
            Swal.fire('Error', errorMessage, 'error');
          }
        );
      }
    });
  }


}
