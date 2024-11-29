import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/Home/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


    constructor(private httpClient: HttpClient) { }

    public añadirUsuario(user: Usuario): Observable<Usuario> {
      return this.httpClient.post<Usuario>(`${baserUrl}/usuarios/`, user);
    }

    public añadirUsuarioPorRegistro(user: Usuario): Observable<Usuario> {
      return this.httpClient.post<Usuario>(`${baserUrl}/usuarios/register`, user);
    }

    public verificarCuenta(codigo: string): Observable<string> {
      const body = { code: codigo };
      return this.httpClient.post<string>(`${baserUrl}/usuarios/verify`, body);
  }


    public añadirPortero(user:any){
      return this.httpClient.post(`${baserUrl}/usuarios/portero/`,user);
    }

    public añadirAdminSistema(user:any){
      return this.httpClient.post(`${baserUrl}/usuarios/admin-sistema/`,user);
    }

    public añadirAdmin(user:any){
      return this.httpClient.post(`${baserUrl}/usuarios/admin/`,user);
    }

     public getAdminsSistema(page: number): Observable<any> {
      return this.httpClient.get(`${baserUrl}/usuarios/page/admins-sistema/${page}`);
    }

    public getAdmins(page: number): Observable<any> {
      return this.httpClient.get(`${baserUrl}/usuarios/page/admins/${page}`);
    }

    public getUsuarios(page: number): Observable<any> {
      return this.httpClient.get(`${baserUrl}/usuarios/page/usuarios/${page}`);
    }

    public getPorteros(page: number): Observable<any> {
      return this.httpClient.get(`${baserUrl}/usuarios/page/porteros/${page}`);
    }


    public obtenerUsuario(usuarioId:any){
      return this.httpClient.get(`${baserUrl}/usuarios/id/${usuarioId}`);
    }

  public actualizarUsuario(id: number, enabled: boolean): Observable<any> {
    const url = `${baserUrl}/usuarios/update-status`;
    const body = { id, enabled };

    return this.httpClient.put<any>(url, body);
  }

  public actualizarUsuarioVerified(id: number, verified: boolean): Observable<any> {
    const url = `${baserUrl}/usuarios/update-verification-status`;
    const body = { id, verified };

    return this.httpClient.put<any>(url, body);
}

  public eliminarUsuario(usuarioId:any){
    return this.httpClient.delete(`${baserUrl}/usuarios/${usuarioId}`);
  }

  public buscarSistemaPorNombre<T>(nombre: string, page: number, size: number): Observable<T> {
    let params = new HttpParams()
      .set('nombre', nombre)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<T>(`${baserUrl}/usuarios/buscar/sistema`, { params });
  }

  public buscarUsuarioPorNombre<T>(nombre: string, page: number, size: number): Observable<T> {
    let params = new HttpParams()
      .set('nombre', nombre)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<T>(`${baserUrl}/usuarios/buscar/admin`, { params });
  }

  public buscarClientePorNombre<T>(nombre: string, page: number, size: number): Observable<T> {
    let params = new HttpParams()
      .set('nombre', nombre)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<T>(`${baserUrl}/usuarios/buscar/usuario`, { params });
  }

  public buscarPorteroPorNombre<T>(nombre: string, page: number, size: number): Observable<T> {
    let params = new HttpParams()
      .set('nombre', nombre)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<T>(`${baserUrl}/usuarios/buscar/portero`, { params });
  }


  public actualizarDetallesUsuario(updates: any): Observable<any> {
    const url = `${baserUrl}/usuarios/update-details`;
    return this.httpClient.put<any>(url, updates);
  }


  public contarUsuariosCumpleanosHoy(): Observable<number> {
    const url = `${baserUrl}/usuarios/birthday-hoy`;
    return this.httpClient.get<number>(url);
  }



  public getCumpleaneros(page: number): Observable<any> {
    return this.httpClient.get(`${baserUrl}/usuarios/page/cumpleanos/${page}`);
  }


  public listarUsuariosPorCumpleanosEntreFechas(
    fechaInicio: string,
    fechaFin: string,
    page: number = 0,
    size: number = 10
  ): Observable<any> {
    let params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin)
      .set('size', size.toString());

    return this.httpClient.get<any>(`${baserUrl}/usuarios/cumpleanos/rango/${page}`, { params });
  }

  public listarClientes(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${baserUrl}/usuarios/clientes`);
  }

  public verificarUsuario(code: string): Observable<any> {
    return this.httpClient.post(`${baserUrl}/usuarios/verify`, { code });
}



public changePassword(code: string, newPassword: string): Observable<any> {
  const body = { code, newPassword };
  return this.httpClient.post<any>(`${baserUrl}/usuarios/change-password`, body);
}


}
