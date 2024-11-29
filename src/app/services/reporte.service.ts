import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }

  public descargarReporteClientes(tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/report/clientes?tipo=${tipo}`, {
      responseType: 'blob'
    });
  }
  public descargarReporteAsistencia(evento:string,tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/report/asistencia?EventoID=${evento}&tipo=${tipo}`, {
      responseType: 'blob'
    });
  }
  public descargarReporteInvitados(fechaInicio: string, fechaFin: string, tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/report/invitados?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}&tipo=${tipo}`, {
      responseType: 'blob'
    });
  }
  public descargarReporteInvitadosPorUsuario(usuario: string, tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/report/invitadoPorUsuario?ID_USUARIO=${usuario}&tipo=${tipo}`, {
      responseType: 'blob'
    });
  }
}
