import { Component, computed } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../../core/services/theme-service';
import { AuthTokenService } from '../../../service/auth-token.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-base-layout',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.scss',
})
export class BaseLayout {
  cartCount = computed(() => this.cartService.totalItems());;
  isSidenavOpen = false;
  userName: string = 'Guest';

  constructor(
    private themeService: ThemeService,
    private tokenService: AuthTokenService,
    private cartService: CartService
  ) {
    this.userName = tokenService.decodeJwtPayload()?.name;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.tokenService.clearTokens();
  }
}
