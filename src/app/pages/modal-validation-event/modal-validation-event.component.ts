import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-validation-event',
  templateUrl: './modal-validation-event.component.html',
  styleUrls: ['./modal-validation-event.component.css']
})
export class ModalValidationEventComponent implements OnInit {

  eventoId = 0;
  inputCode = '';

  evento: any = {
    codeIdentify:'',
  };

  constructor(private ModalService:ModalService,@Inject(MAT_DIALOG_DATA) public data: any,private EventosService:ClienteService) { }

  ngOnInit(): void {
    this.eventoId = this.data.eventoId;
    this.obtenerEvento(this.eventoId);
  }

  obtenerEvento(eventoId: any) {
    this.EventosService.obtenerEvento(eventoId).subscribe(
      (response: any) => {
        this.evento = response;
      },
      (error) => {
      }
    );
  }

  validateCode() {
    if (this.inputCode === this.evento.codeIdentify) {
      this.closeModal();
      this.abrirModalQr(this.eventoId);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Código de validación incorrecto',
        text: 'El código que ingresaste es incorrecto, intenta nuevamente.',
        confirmButtonColor: '#0c0033',
      });
    }
  }

  abrirModalQr(eventoId: number): void {
    this.ModalService.openQR(eventoId);
  }

  closeModal() {
    this.ModalService.cerrarValidationEvento();
  }

}
