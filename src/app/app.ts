import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'aaa-mart';
  isLogin: boolean = false;
  toggleMenu: boolean = true;
  currentTheme: 'light-theme' | 'dark-theme' = 'light-theme';

  toggleTheme(): void {
    this.currentTheme =
      this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    document.body.className = this.currentTheme;
  }

  constructor(private router: Router) {
    router.events.subscribe({
      next: (data: any) => {
        this.isLogin =
          router.url.includes('login') || router.url.includes('signup');
      },
    });
  }

  toggleSidenav() {
    this.toggleMenu = !this.toggleMenu;
  }
}
