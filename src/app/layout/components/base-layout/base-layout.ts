import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../../core/services/theme-service';

@Component({
  selector: 'app-base-layout',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    RouterOutlet,
  ],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.scss',
})
export class BaseLayout {
  isSidenavOpen = false;
  userName = 'John Doe';

  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
    // Add dynamic theme switching logic here
    console.log('Theme toggled');
  }

  logout() {
    // Add logout logic here
    console.log('Logging out...');
  }
}
