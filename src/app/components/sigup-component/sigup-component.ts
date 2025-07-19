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
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-sigup-component',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sigup-component.html',
  styleUrl: './sigup-component.scss',
  standalone: true,
})
export class SigupComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth,
    private cryptoService: CryptoService,
    private notify: NotificationService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.getSecureData(async (response: SecureLog) => {
        if (response.secLog) {
          const { firstName, lastName, email } = this.signupForm.value;
          const { key, iv } = await this.cryptoService.generateAESKeyIV();
          const encEmail = await this.cryptoService.encryptWithAES(
            email,
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
          const encryptedType = await this.cryptoService.encryptWithAES('3', key, iv);
          this.authService.userRegistration(
            { firstName, lastName, email: encEmail, type: encryptedType, encryptedKey, encryptedIv },
            (response: any) => {
              if (response.message && response.message == 'User Created Successfuly') {
                this.notify.showSuccess(response.message);
                this.router.navigateByUrl('login');
              }
            }
          );
        }
      });
    }
  }
}
