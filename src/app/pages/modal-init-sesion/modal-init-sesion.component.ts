import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-init-sesion',
  templateUrl: './modal-init-sesion.component.html',
  styleUrls: ['./modal-init-sesion.component.css']
})
export class ModalInitSesionComponent implements OnInit {

  constructor(private ModalService:ModalService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.ModalService.cerrarInitSesion();
  }



}
