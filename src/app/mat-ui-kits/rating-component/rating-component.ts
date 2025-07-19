import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  templateUrl: './rating-component.html',
  styleUrl: './rating-component.scss',
  imports: [CommonModule, MatIconModule],
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();
  stars = Array(5);

  onSelect(value: number) {
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }
}
