import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventosService } from '../../../services/eventos.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-modal-detalle-eventos',
  templateUrl: './modal-detalle-eventos.component.html',
  styleUrls: ['./modal-detalle-eventos.component.css']
})
export class ModalDetalleEventosComponent implements OnInit {
  isActive: boolean = false; // Estado inicial del evento
  eventoId = 0;

  evento: any = {
    fechaInicio: '',
    horaInicio: '',
    fechaFin: '',
    horaFin: '',
    visibilidad: '',
    estado:'',
    codeIdentify:'',
  };

  constructor(private ModalService:ModalService,@Inject(MAT_DIALOG_DATA) public data: any,private EventosService:EventosService) { }

  ngOnInit(): void {
    this.eventoId = this.data.eventoId;
    this.EventosService.obtenerEvento(this.eventoId).subscribe(
      (data) => {
        this.evento = data;
         // Partir fechaInicio en fecha y hora
         const [fecha, hora] = this.evento.fechaInicio.split('T');
         this.evento.fechaInicio = new Date(fecha+ 'T00:00:00'); // Solo la fecha
         this.evento.horaInicio = hora; // Solo la hora

         const [fechaFin, horaFin] = this.evento.fechaFin.split('T');
         this.evento.fechaFin = new Date (fechaFin+ 'T00:00:00'); // Solo la fecha
         this.evento.horaFin = horaFin; // Solo la hora

        this.isActive = this.evento.activo;
      },
      (error) => {
      }
    )
  }

  closeModal() {
    this.ModalService.cerrarDetalleEvento();
  }

  public toggleEventStatus(event: MatSlideToggleChange) {
    this.isActive = event.checked;
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

actualizarDatos() {

  if (!this.evento.fechaInicio || !this.evento.horaInicio || !this.evento.fechaFin || !this.evento.horaFin) {
    Swal.fire(
      'Error',
      'Por favor, completa todos los campos del formulario.',
      'warning'
    );
    return; // Detener la ejecución si falta algún campo
  }

  // Asignar los valores del formulario al objeto evento
  this.evento.horaFin = this.evento.horaFin || '23:59'; // Valor por defecto si no se selecciona
  this.evento.cantidadQR = this.evento.cantidadQR;
  this.evento.codeIdentify = this.evento.codeIdentify;
  this.evento.activo = this.isActive;
  this.evento.estado = this.isActive ? 'Activo' : 'No Activo';

// Combinar fechaInicio y horaInicio
const fechaInicio = new Date(this.evento.fechaInicio);

const [horaInicio, minutosInicio] = this.evento.horaInicio.split(':');

// Crear una nueva fecha con la hora combinada para fechaInicio
const combinedDateInicio = new Date(
  fechaInicio.getFullYear(),
  fechaInicio.getMonth(),
  fechaInicio.getDate(),
  parseInt(horaInicio, 10),
  parseInt(minutosInicio, 10)
);

// Obtener componentes en hora local (no UTC)
const yearInicio = combinedDateInicio.getFullYear();
const monthInicio = String(combinedDateInicio.getMonth() + 1).padStart(2, '0');
const dayInicio = String(combinedDateInicio.getDate()).padStart(2, '0');
const hoursInicio = String(combinedDateInicio.getHours()).padStart(2, '0');
const minutesInicio = String(combinedDateInicio.getMinutes()).padStart(2, '0');
const secondsInicio = String(combinedDateInicio.getSeconds()).padStart(2, '0');


const formattedDateInicio = `${yearInicio}-${monthInicio}-${dayInicio}T${hoursInicio}:${minutesInicio}:${secondsInicio}`;

// Asignar la fecha formateada a fechaInicio y omitir horaInicio
this.evento.fechaInicio = formattedDateInicio;
delete this.evento.horaInicio; // Omitir horaInicio

  // Combinar fechaFin y horaFin
  const fechaFin = new Date(this.evento.fechaFin);
  const [horaFin, minutosFin] = this.evento.horaFin.split(':');

  // Crear una nueva fecha con la hora combinada para fechaFin
  const combinedDateFin = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate(), parseInt(horaFin, 10), parseInt(minutosFin, 10));

  // Obtener componentes para enviar fechaFin
  const yearFin = combinedDateFin.getFullYear();
  const monthFin = String(combinedDateFin.getMonth() + 1).padStart(2, '0');
  const dayFin = String(combinedDateFin.getDate()).padStart(2, '0');
  const hoursFin = String(combinedDateFin.getHours()).padStart(2, '0');
  const minutesFinUTC = String(combinedDateFin.getMinutes()).padStart(2, '0');
  const secondsFin = String(combinedDateFin.getSeconds()).padStart(2, '0');
  const formattedDateFin = `${yearFin}-${monthFin}-${dayFin}T${hoursFin}:${minutesFinUTC}:${secondsFin}`;

  // Asignar la fecha formateada a fechaFin y omitir horaFin
  this.evento.fechaFin = formattedDateFin;
  delete this.evento.horaFin; // Omitir horaFin


  this.EventosService.actualizarEvento(this.evento).subscribe(
    (data) => {
        Swal.fire('Configuración guardada', 'La configuración ha sido actualizado con éxito', 'success').then(
            (e) => {
                this.ModalService.cerrarDetalleEvento();
                location.reload();
            }
        );
    },
    (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar la configuración', 'error').then(
            (e) => {
                this.ModalService.cerrarDetalleEvento(); // Cerrar el modal
                location.reload(); // Actualizar la página
            }
        );
    }
);
}

}
