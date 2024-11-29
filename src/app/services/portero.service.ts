import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';
import { Evento } from '../Models/Home/evento.model';


@Injectable({
  providedIn: 'root'
})
export class PorteroService {

  constructor(private http:HttpClient) { }

  public generateQRCodeConfirmed(event: string, user: string, dni: string): Observable<string> {

    const qrCodeRequest = { event, user, dni };

    return this.http.post<string>(`${baserUrl}/porteros/generate/confirmed`, qrCodeRequest, { responseType: 'text' as 'json' });
  }

  public validateQRCode(valorQR: string): Observable<any> {
  return this.http.post<any>(`${baserUrl}/porteros/validate`, { valorQR: valorQR });
  }

  public  obtenerRegistroEvento(eventoId: number, usuarioId: number): Observable<any> {
    return this.http.get<any>(`${baserUrl}/porteros/${eventoId}/${usuarioId}`);
  }


  public actualizarRegistroEvento(id: number, portero?: string, estadoAsistencia?: string): Observable<any> {
    const url = `${baserUrl}/porteros/update-asistencia`;
    const body = {
      id: id,
      portero: portero,
      estadoAsistencia: estadoAsistencia
    };

    return this.http.put<any>(url, body);
  }

  public obtenerEventosActivos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${baserUrl}/porteros/activo`);
  }

  public getRegistroEventosByEventoNombre(eventoId: number, page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('eventoId', eventoId)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${baserUrl}/porteros/historial-asistencia`, { params });
  }

  public verificarQRCode(valorQR: string): Observable<boolean> {
    const requestBody = { valorQR };
    return this.http.post<boolean>(`${baserUrl}/porteros/validar`, requestBody);
  }

  public descargarReporteAsistencia(evento:string,tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/porteros/asistencia?EventoID=${evento}&tipo=${tipo}`, {
      responseType: 'blob'
    });
  }
  public descargarReporteInvitados(fechaInicio: string, fechaFin: string, tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/porteros/invitados?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}&tipo=${tipo}`, {
      responseType: 'blob'
    });
  }
  public descargarReporteInvitadosPorUsuario(usuario: string, tipo: string): Observable<Blob> {
    return this.http.get(`${baserUrl}/porteros/invitadoPorUsuario?ID_USUARIO=${usuario}&tipo=${tipo}`, {
      responseType: 'blob'
    });
  }

  public listarEventos(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/porteros/eventos/`);
  }

  public listarClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/porteros/clientes`);
  }

}
