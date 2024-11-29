import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private http:HttpClient) { }

  public async generateQRCode(event: string, user: string, dni: string): Promise<string> {

    const qrCodeRequest: any = {
      event,
      user,
      dni
    };

    return await firstValueFrom(
      this.http.post<string>(`${baserUrl}/qrcode/generate`, qrCodeRequest, { responseType: 'text' as 'json' })
    );
  }



  public generateQRCodeConfirmed(event: string, user: string, dni: string): Observable<string> {

    const qrCodeRequest = { event, user, dni };

    return this.http.post<string>(`${baserUrl}/qrcode/generate/confirmed`, qrCodeRequest, { responseType: 'text' as 'json' });
}


  public agregarQR(qr:any){
    return this.http.post(`${baserUrl}/qrcode/`,qr);
  }

  public validateQRCode(valorQR: string): Observable<any> {
    return this.http.post<any>(`${baserUrl}/qrcode/validate`, { valorQR: valorQR });
  }

  public verificarQRCode(valorQR: string): Observable<boolean> {
    const requestBody = { valorQR };
    return this.http.post<boolean>(`${baserUrl}/qrcode/validar`, requestBody);
  }


}
