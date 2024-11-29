import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventosService } from 'src/app/services/eventos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-add-eventos',
  templateUrl: './modal-add-eventos.component.html',
  styleUrls: ['./modal-add-eventos.component.css']
})
export class ModalAddEventosComponent implements OnInit {

  form!: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;

  constructor(private ModalService: ModalService, private http: HttpClient, private fb: FormBuilder, private eventosService: EventosService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      fechaEvento: ['', Validators.required],
      file: [null, Validators.required],
      fechaInicio: ['', Validators.required],
      horaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      horaFin: ['', Validators.required],
      cantidadQR: ['', Validators.required],
      codeIdentify:['',Validators.required]
    });
  }

  ngOnInit(): void {
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
    this.ModalService.cerrarModal();
  }

  // Función para formatear fechas
  private formatDate(date: Date): string {
    // Obtener los componentes de la fecha
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes 0-11, así que sumamos 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    // Formatear la fecha y hora
    const datePart = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const msPart = milliseconds.padEnd(6, '0'); // Completa a 6 dígitos

    return `${datePart}.${msPart}`; // Retorna el formato deseado
}

  submitForm(): void {
    if (this.form.valid && this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('nombre', this.form.get('nombre')!.value);

            // Obtener y combinar las fechas y horas
      const fechaEventoStr = this.form.get('fechaEvento')!.value;


      const fechaEvento = new Date(fechaEventoStr);

      const fechaEventoISO = this.formatDate(fechaEvento);


            // Convertir fechaInicio y horaInicio a Date
      const fechaInicioStr = this.form.get('fechaInicio')!.value;

      const fechaInicio = new Date(fechaInicioStr);

      const horaInicio = this.form.get('horaInicio')!.value;

      const [horas, minutos] = horaInicio.split(':').map(Number);

      fechaInicio.setHours(horas, minutos);



      // Convertir fechaFin y horaFin a Date
      const fechaFinStr = this.form.get('fechaFin')!.value;

      const fechaFin = new Date(fechaFinStr);

      const horaFin = this.form.get('horaFin')!.value;

      const [finHoras, finMinutos] = horaFin.split(':').map(Number);

      fechaFin.setHours(finHoras, finMinutos);


      const fechaInicioISO = this.formatDate(fechaInicio);
      const fechaFinISO = this.formatDate(fechaFin);

      const visibilidad = 'NORMAL';
      const cantidadQR = this.form.get('cantidadQR')!.value;

      const codeIdentify = this.form.get('codeIdentify')!.value;



      this.eventosService.createEvento(
        this.selectedFile,
        this.form.get('nombre')!.value,
        fechaEventoISO,
        visibilidad,
        fechaInicioISO,
        fechaFinISO,
        cantidadQR,
        codeIdentify
      ).subscribe(
        response => {
          Swal.fire(
            'Éxito',
            'Datos guardados correctamente.',
            'success'
          ).then(() => {
            this.closeModal();
            window.location.reload();
          });
        },
        error => {
          Swal.fire(
            'Error',
            'Hubo un problema al crear el evento.',
            'error'
          );
        }
      );
    } else {
      Swal.fire(
        'Error',
        'Por favor, completa todos los campos del formulario.',
        'warning'
      );
    }
  }

}
