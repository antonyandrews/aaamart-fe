import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = false;

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-theme', this.isDark);
  }

  isDarkMode(): boolean {
    return this.isDark;
  }
}
