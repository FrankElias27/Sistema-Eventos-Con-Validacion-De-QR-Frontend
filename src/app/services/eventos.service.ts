import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper';
import { Evento } from '../Models/Home/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http:HttpClient) { }

  createEvento(
    file: File,
    nombre: string,
    fechaEvento: string,
    visibilidad: string,
    fechaInicio: string,
    fechaFin: string,
    cantidadQR: number,
    codeIdentify: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('nombre', nombre);
    formData.append('fechaEvento', fechaEvento);
    formData.append('visibilidad', visibilidad);
    formData.append('fechaInicio', fechaInicio);
    formData.append('fechaFin', fechaFin);
    formData.append('cantidadQR', cantidadQR.toString());
    formData.append('codeIdentify', codeIdentify);

    return this.http.post(`${baserUrl}/eventos/create`, formData);
  }

  createConfiguration(
    fechaInicio: string,
    fechaFin: string,
    visibilidad: string,
    cantidadQR: number,
    activo: boolean
  ): Observable<any> {
    const formData = new FormData();
    formData.append('fechaInicio', fechaInicio);
    formData.append('fechaFin', fechaFin);
    formData.append('visibilidad', visibilidad);
    formData.append('cantidadQR', cantidadQR.toString());
    formData.append('activo', activo.toString());

    return this.http.post(`${baserUrl}/eventos/configuration`, formData);
  }


  updateEvento(id: number, nombre: string, fechaEvento: string, imagen?: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('fechaEvento', fechaEvento);

    if (imagen) {
      formData.append('imagen', imagen);
    }

    return this.http.put<any[]>(`${baserUrl}/eventos/${id}`, formData);
  }

  public actualizarEvento(evento:any){
    return this.http.put(`${baserUrl}/eventos/`,evento);
  }


  getEvento(id: number): Observable<any> {
    return this.http.get(`${baserUrl}/eventos/${id}`);
  }

  public getEventos(page: number): Observable<any> {
    return this.http.get(`${baserUrl}/eventos/page/${page}`);
  }


  public obtenerEventosActivos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${baserUrl}/eventos/activo`);
  }

  public obtenerEvento(eventoId:any){
    return this.http.get(`${baserUrl}/eventos/${eventoId}`);
  }


  public eliminarEvento(eventoId:any){
    return this.http.delete(`${baserUrl}/eventos/${eventoId}`);
  }

  public listarEventos(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/eventos/`);
  }


}
