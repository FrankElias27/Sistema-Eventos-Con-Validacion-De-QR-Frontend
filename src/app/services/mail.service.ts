import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  public requestPasswordReset(email: string): Observable<any> {
    const body = new HttpParams().set('email', email);
    return this.http.post<any>(`${baserUrl}/mail/request`, body);
}
}
