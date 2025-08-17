import { Injectable, signal, computed } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  // Store the current screen size label (xs, sm, md, lg, xl)
  currentScreen = signal(4);

  constructor(private observer: BreakpointObserver) {
    this.observer
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          this.currentScreen.set(1);
        } else if (state.breakpoints[Breakpoints.Small]) {
          this.currentScreen.set(2);
        } else if (state.breakpoints[Breakpoints.Medium]) {
          this.currentScreen.set(3);
        } else if (state.breakpoints[Breakpoints.Large]) {
          this.currentScreen.set(4);
        } else if (state.breakpoints[Breakpoints.XLarge]) {
          this.currentScreen.set(4);
        }
      });
  }

  // Public signals
  screenSize = computed(() => this.currentScreen());

  isXs = computed(() => this.currentScreen() === 1);
  isSm = computed(() => this.currentScreen() === 2);
  isMd = computed(() => this.currentScreen() === 3);
  isLg = computed(() => this.currentScreen() === 4);
  isXl = computed(() => this.currentScreen() === 4);

  isMobile = computed(() => [1, 2].includes(this.currentScreen()));
  isTablet = computed(() => this.currentScreen() === 3);
  isDesktop = computed(() => [4].includes(this.currentScreen()));
}
