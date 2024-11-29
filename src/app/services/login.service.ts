import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  public generateToken(loginData:any){
    return this.http.post(`${baserUrl}/generate-token`,loginData);
  }

  public getCurrentUser(){
    return this.http.get(`${baserUrl}/actual-usuario`);
  }

  public loginUser(token:any){
    sessionStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = sessionStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  public logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('attempts-data');
    return true;
  }

  public getToken(){
    return sessionStorage.getItem('token');
  }

  public setUser(user:any){
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = sessionStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }



}
