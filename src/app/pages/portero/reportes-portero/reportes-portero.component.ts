import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reportes-portero',
  templateUrl: './reportes-portero.component.html',
  styleUrls: ['./reportes-portero.component.css']
})
export class ReportesPorteroComponent implements OnInit {

  constructor(private reportService: ReporteService,private http: HttpClient, private ModalService:ModalService) { }

  ngOnInit(): void {
  }



  abrirModalAsistencia(): void {
    this.ModalService.openModalAsistencia();
  }


  abrirModalInvitadosUsuario(): void {
    this.ModalService.openModalInvitadosPortero();
  }


}


