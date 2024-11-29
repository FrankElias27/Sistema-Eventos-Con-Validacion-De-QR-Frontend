import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http:HttpClient) { }

  public agregarRegistro(registro:any){
    return this.http.post(`${baserUrl}/registroEvento/`,registro);
  }


  public verificarAsistencia(eventoId: number, usuarioId: number): Observable<boolean> {
    const requestBody = { eventoId, usuarioId };
    return this.http.post<boolean>(`${baserUrl}/registroEvento/verificar`, requestBody);
}

  public actualizarRegistro(registro:any){
    return this.http.put(`${baserUrl}/registroEvento/`,registro);
  }

  public  obtenerRegistroEvento(eventoId: number, usuarioId: number): Observable<any> {
    return this.http.get<any>(`${baserUrl}/registroEvento/${eventoId}/${usuarioId}`);
  }


  public actualizarRegistroEvento(id: number, portero?: string, estadoAsistencia?: string): Observable<any> {
    const url = `${baserUrl}/registroEvento/update-asistencia`;
    const body = {
      id: id,
      portero: portero,
      estadoAsistencia: estadoAsistencia
    };

    return this.http.put<any>(url, body);
  }

  public getRegistroEventosByEventoNombre(eventoId: number, page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('eventoId', eventoId)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${baserUrl}/registroEvento/historial-asistencia`, { params });
  }

}
