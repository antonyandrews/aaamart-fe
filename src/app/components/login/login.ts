import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../service/auth';
import { SecureLog } from '../../interface/auth/auth.interface';
import { CryptoService } from '../../utils/crypto-service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private cryptoService: CryptoService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.authService.getSecureData(async (response: SecureLog) => {
        if (response.secLog) {
          const { email, password } = this.loginForm.value;
          const { key, iv } = await this.cryptoService.generateAESKeyIV();
          const encEmail = await this.cryptoService.encryptWithAES(
            email,
            key,
            iv
          );
          const encPass = await this.cryptoService.encryptWithAES(
            password,
            key,
            iv
          );
          const encryptedKey = await this.cryptoService.encryptWithRSA(
            key,
            response.secLog
          );
          const encryptedIv = await this.cryptoService.encryptWithRSA(
            iv,
            response.secLog
          );
          this.authService.loginUser(
            { email: encEmail, password: encPass, encryptedKey, encryptedIv },
            (response: any) => {
              if (response.token) {
                localStorage.setItem('token', response.token);
                this.router.navigateByUrl("dashboard");
              }
            }
          );
        }
      });
    } else {
      console.log('Form Invalid');
    }
  }
}
