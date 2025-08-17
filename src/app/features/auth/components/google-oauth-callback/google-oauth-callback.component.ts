import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../../services/google-service.service';

@Component({
  selector: 'app-google-oauth-callback',
  templateUrl: './google-oauth-callback.component.html',
  styleUrls: ['./google-oauth-callback.component.scss'],
  standalone: true
})
export class GoogleOauthCallbackComponent implements OnInit {

  constructor(
    private googleAuth: GoogleService,
    private router: Router
  ) { }

  ngOnInit() {
    const code = sessionStorage.getItem('google_code');
    const state = sessionStorage.getItem('google_state');
    const storedState = sessionStorage.getItem('google_state');

    if (code && state === storedState) {
      this.googleAuth.exchangeCodeForToken(code, (response: string) => {
        if (response == 'success') {
          this.router.navigate(['/product']);
        }
      })
    } else {
      console.error('Invalid OAuth state or missing code');
    }
  }
}
