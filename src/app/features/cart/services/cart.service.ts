// src/app/services/cart.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../interface/cart-interface';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  get items() {
    return this.cartItems.asReadonly();
  }

  get totalItems() {
    return computed(() =>
      this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
    );
  }

  addToCart(product: Omit<CartItem, 'quantity'>) {
    const existing = this.cartItems().find((item) => item.id === product.id);
    if (existing) {
      this.cartItems.update((items) =>
        items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this.cartItems.update((items) => [...items, { ...product, quantity: 1 }]);
    }
  }

  decreaseQuantity(id: number) {
    this.cartItems.update((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  removeItem(id: number) {
    this.cartItems.update((items) => items.filter((item) => item.id !== id));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
