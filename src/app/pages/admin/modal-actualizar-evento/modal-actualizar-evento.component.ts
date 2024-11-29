import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';// Cambia el nombre del servicio aquí
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventosService } from 'src/app/services/eventos.service';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-actualizar-evento',
  templateUrl: './modal-actualizar-evento.component.html',
  styleUrls: ['./modal-actualizar-evento.component.css']
})
export class ModalActualizarEventoComponent implements OnInit {

  form!: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  eventoId = 0;
  evento: any;

  constructor(
    private modalService: ModalService,
    private eventService: EventosService,
    private fb: FormBuilder, // Inyectar FormBuilder
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Inicializa el formulario aquí
    this.form = this.fb.group({
      file: [null], // Asegúrate de tener este campo en el formulario
    });
  }

  ngOnInit(): void {
    this.eventoId = this.data.eventoId;
    this.eventService.obtenerEvento(this.eventoId).subscribe(
      (data) => {
        this.evento = data;
        this.evento.fechaEvento = moment(this.evento.fechaEvento).toDate(); // Convierte a objeto Date
      },
      (error) => {
      }
    );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const fileSizeInKB = this.selectedFile.size / 1024; // Convertir a KB

      if (fileSizeInKB > 80) {
        Swal.fire(
          'Error',
          'El tamaño del archivo debe ser menor de 80 KB.',
          'warning'
        );
        this.selectedFile = null;
        this.selectedFileName = null;
        this.form.patchValue({
          file: null
        });
      } else {
        this.selectedFileName = this.selectedFile.name;
        this.form.patchValue({
          file: this.selectedFile
        });
      }
    }
  }

  closeModal() {
    this.modalService.cerrarModalActualizarEvento();
  }

  submitForm(): void {
    if (!this.evento.nombre || !this.evento.fechaEvento) {
      Swal.fire('Error', 'Por favor, completa todos los campos requeridos.', 'warning');
      return;
    }

    // Usar Moment.js para formatear la fecha
    const formattedDate = moment(this.evento.fechaEvento).format('YYYY-MM-DDTHH:mm:ss');

    const eventoData = {
      id: this.eventoId,
      nombre: this.evento.nombre,
      fechaEvento: formattedDate,
      archivo: this.selectedFile ? this.selectedFile : undefined
    };

    this.eventService.updateEvento(
      eventoData.id,
      eventoData.nombre,
      eventoData.fechaEvento,
      eventoData.archivo
    ).subscribe(
      () => {
        Swal.fire('Evento actualizado', 'El evento ha sido actualizado con éxito', 'success').then(() => {
          this.modalService.cerrarModalActualizarEvento();
          location.reload();
        });
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar el evento. Detalle: ' + error.message, 'error');
      }
    );
  }
}
