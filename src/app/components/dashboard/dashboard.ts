import { Component, inject, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Grid } from "../../mat-ui-kits/grid/grid";

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatButtonModule, MatGridListModule, Grid],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
})
export class Dashboard {
  private breakpointObserver = inject(BreakpointObserver);

  cols = signal(4); // Default desktop

  constructor() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols.set(1);
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.cols.set(2);
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.cols.set(3);
        } else {
          this.cols.set(4);
        }
      });
  }
}
