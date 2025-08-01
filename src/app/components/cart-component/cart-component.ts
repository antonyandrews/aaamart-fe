import { Component, computed } from '@angular/core';
import { CartItem, CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-cart-component',
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatGridListModule],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss',
})
export class CartComponent {

  cartItems: any;

  total = computed(() =>
    this.cartService.items().reduce((acc, item) => acc + item.quantity * item.price, 0)
  );

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.items
  }

  increase(item: CartItem) {
    this.cartService.addToCart(item);
  }

  decrease(item: CartItem) {
    this.cartService.decreaseQuantity(item.id);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item.id);
  }
}
