import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  responseMessage: string | null = null;
  isError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.verificarUsuario(code);
      }
    });
  }

  verificarUsuario(code: string): void {
    this.authService.verificarUsuario(code).subscribe(
      response => {
        this.responseMessage = response.message;
        this.isError = false;
      },
      error => {
        this.responseMessage = error.error.message || 'Error en la verificación.';
        this.isError = true;
      }
    );
  }


}
