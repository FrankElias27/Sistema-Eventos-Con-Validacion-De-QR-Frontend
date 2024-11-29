import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from '../../../services/modal.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-listas',
  templateUrl: './view-listas.component.html',
  styleUrls: ['./view-listas.component.css']
})
export class ViewListasComponent implements OnInit {

  cumpleaneros: any[] = [];
  currentPage: number = 0;
  size: number = 10;
  totalPages: number = 0;
  fechaInicio: string = '';
  fechaFin: string = '';
  displayedColumns: string[] = ['Nombre', 'Dni', 'Fecha de Nacimiento', 'Edad', 'Acciones'];

  constructor(private userService: UserService, private modalService: ModalService) { }

  ngOnInit(): void {
  }

  loadCumpleaneros() {
    this.userService.listarUsuariosPorCumpleanosEntreFechas(this.fechaInicio, this.fechaFin, this.currentPage, this.size)
      .subscribe(response => {
        this.cumpleaneros = response.content;
        this.totalPages = response.totalPages;

        // Si no hay resultados, reinicia el array y establece totalPages a 0
        if (this.cumpleaneros.length === 0) {
          this.cumpleaneros = []; // Asegura que esté vacío
          this.totalPages = 0; // Resetea el total de páginas
        }
      }, error => {
        // Manejo de errores (puedes agregar un mensaje o log)
        this.cumpleaneros = []; // Asegura que esté vacío en caso de error
        this.totalPages = 0; // Resetea el total de páginas
      });
  }

  onSearch() {
    const startDateInput = (document.getElementById('datepicker-range-start') as HTMLInputElement).value;
    const endDateInput = (document.getElementById('datepicker-range-end') as HTMLInputElement).value;


    if (startDateInput && endDateInput) {
      this.fechaInicio = this.convertDateFormat(startDateInput);
      this.fechaFin = this.convertDateFormat(endDateInput);
      this.loadCumpleaneros();
    } else {
    }
  }

  convertDateFormat(date: string): string {
    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD'); // Convierte de DD/MM/YYYY a YYYY-MM-DD
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadCumpleaneros();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadCumpleaneros();
    }
  }

  abrirModalLista(id: any): void {
    this.modalService.openListBirthday(id);
  }

  getAgeToCome(fechaNacimiento: Date): number {
    const birthDate = moment(fechaNacimiento);
    const today = moment();
    return today.diff(birthDate, 'years'); // Calcula la edad en años
  }
}
