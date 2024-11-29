import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Evento } from '../Models/Home/evento.model';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';
import { Birthday } from '../Models/Home/birthday.model';
import { Respuesta } from '../Models/Home/respuesta.model';
import { Invitado } from '../Models/Home/invitado.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  public obtenerEventosActivos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${baserUrl}/clientes/activo`);
  }

  public verificarAsistencia(eventoId: number, usuarioId: number): Observable<boolean> {
    const requestBody = { eventoId, usuarioId };
    return this.http.post<boolean>(`${baserUrl}/clientes/verificar`, requestBody);
  }

  public async generateQRCode(event: string, user: string, dni: string): Promise<string> {
    const qrCodeRequest: any = {
      event,
      user,
      dni
    };

    return await firstValueFrom(
      this.http.post<string>(`${baserUrl}/clientes/generate`, qrCodeRequest, { responseType: 'text' as 'json' })
    );
  }

  public agregarQR(qr:any){
    return this.http.post(`${baserUrl}/clientes/guardarqr`,qr);
  }

  public agregarRegistro(registro:any){
    return this.http.post(`${baserUrl}/clientes/guardar-registro`,registro);
  }

  public generateQRCodeConfirmed(event: string, user: string, dni: string): Observable<string> {
    const qrCodeRequest = { event, user, dni };

    return this.http.post<string>(`${baserUrl}/clientes/generate/confirmed`, qrCodeRequest, { responseType: 'text' as 'json' });
  }

  public agregarCumpleaños(nuevosCumpleaños: any): Observable<string> {
    return this.http.post<string>(`${baserUrl}/clientes/birthday/agregar`, nuevosCumpleaños);
  }

  public obtenerInvitados(): Observable<Invitado[]> {
    return this.http.get<Invitado[]>(`${baserUrl}/clientes/invitados`);
  }

  public obtenerEvento(eventoId:any){
    return this.http.get(`${baserUrl}/clientes/obtener/${eventoId}`);
  }
}
