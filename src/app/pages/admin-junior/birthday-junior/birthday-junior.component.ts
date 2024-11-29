import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-birthday-junior',
  templateUrl: './birthday-junior.component.html',
  styleUrls: ['./birthday-junior.component.css']
})
export class BirthdayJuniorComponent implements OnInit {

  cumpleaneros: any[] = [];
  displayedColumns: string[] = ['Nombre', 'Dni', 'Fecha de Nacimiento', 'Edad'];
  currentPage: number = 0;

  constructor(private UserService:UserService,private ModalService:ModalService) { }

  ngOnInit(): void {
    this.getCumpleaneros(this.currentPage); // Inicializa con la primera página
  }

  abrirModalLista(id: any): void {
    this.ModalService.openListBirthday(id);
  }


  getCumpleaneros(page: number): void {
    this.UserService.getCumpleaneros(page)
      .subscribe(
        response => {
          this.cumpleaneros = response.content; // Asigna el contenido de la página actual
          this.currentPage = response.number; // Actualiza la página actual
        },
        error => {

        }
      );
  }

  nextPage(): void {
    this.getCumpleaneros(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getCumpleaneros(this.currentPage - 1);
    }
  }

  getAgeToCome(fechaNacimiento: Date): number {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Ajusta la edad si el cumpleaños aún no ha pasado este año
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age ; // La edad que va a cumplir
  }


}
