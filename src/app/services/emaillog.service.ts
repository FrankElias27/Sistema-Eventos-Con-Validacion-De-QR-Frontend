import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmaillogService {

  constructor(private http: HttpClient) { }

  public deleteEmailLogsByUsuarioId(usuarioId: number): Observable<string> {
    const url = `${baserUrl}/email-logs/usuario/${usuarioId}`;
    return this.http.delete<string>(url, { observe: 'body' });
  }


  public eliminarRegistrosDeHoy(usuarioId: number): Observable<any> {
    return this.http.delete<string>(`${baserUrl}/email-logs/usuario/${usuarioId}/hoy`)
  }

}
