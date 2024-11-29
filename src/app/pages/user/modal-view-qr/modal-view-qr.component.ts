import { Component, Inject, OnInit } from '@angular/core';
import { QrService } from '../../../services/qr.service';
import { LoginService } from 'src/app/services/login.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-modal-view-qr',
  templateUrl: './modal-view-qr.component.html',
  styleUrls: ['./modal-view-qr.component.css']
})
export class ModalViewQrComponent implements OnInit {
  qrCodeImage: string | null = null;
  errorMessage: string | null = null;
  user: any;
  dni: string | null = null;

  constructor(private QrService:ClienteService, private loginService:LoginService,@Inject(MAT_DIALOG_DATA) public data: { eventoId: string }) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    if (this.user) {
      this.dni = this.user.dni;
      this.generateQRCode();
    } else {
      this.errorMessage = 'User not found';
    }
  }

  generateQRCode(): void {
    if (!this.user || !this.dni) {
      this.errorMessage = 'Missing user information';
      return;
    }

    const userId = this.user.id;

    this.QrService.generateQRCodeConfirmed(this.data.eventoId, userId, this.dni).subscribe({
      next: (qrCodeImage) => {
        this.qrCodeImage = qrCodeImage;
      },
      error: (error) => {
        this.errorMessage = 'Error generating QR Code';
      }
    });
  }

  downloadTicket() {
    const ticketElement = document.getElementById('ticket-to-download');

    if (ticketElement) {
      html2canvas(ticketElement).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'MiCódigoQR-EvaClub.png';
        link.click();
      }).catch(error => {
      });
    }
  }

}
