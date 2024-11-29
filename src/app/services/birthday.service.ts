import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserUrl from './helper';
import { Birthday } from '../Models/Home/birthday.model';
import { Respuesta } from '../Models/Home/respuesta.model';
import { Invitado } from '../Models/Home/invitado.model';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  constructor(private http:HttpClient) { }


  public agregarBirthday(birthday: Birthday): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${baserUrl}/birthday/`, birthday);
  }

  public getLatestDescription(usuarioId: number): Observable<string> {
    return this.http.get<string>(`${baserUrl}/birthday/latest/${usuarioId}`);
}

public agregarCumpleaños(nuevosCumpleaños: any): Observable<string> {
  return this.http.post<string>(`${baserUrl}/birthday/agregar`, nuevosCumpleaños);
}


public obtenerInvitados(): Observable<Invitado[]> {
  return this.http.get<Invitado[]>(`${baserUrl}/birthday/invitados`);
}


public obtenerInvitadosPorUsuario(usuarioId: number): Observable<any[]> {
  return this.http.get<any[]>(`${baserUrl}/birthday/invitados/${usuarioId}`);
}

public actualizarCumpleaños(usuarioId: number, cumpleañosActualizados: any[]): Observable<any> {
  return this.http.put(`${baserUrl}/birthday/actualizar/${usuarioId}`, cumpleañosActualizados);
}


}
