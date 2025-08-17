import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductInterface } from '../../interface/product-interface';
import { CartService } from '../../../cart/services/cart.service';

import { StarRatingComponent } from '../../../shared/components/rating-component/rating-component';
import { ResponsiveService } from '../../../shared/service/responsive';

@Component({
  selector: 'app-product',
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    StarRatingComponent,
  ],
  templateUrl: './product.html',
  styleUrl: './product.scss',
  standalone: true,
})
export class Product {
  products: ProductInterface[] = [
    {
      id: 1,
      name: 'T-Shirt',
      image:
        'https://chriscross.in/cdn/shop/files/ChrisCrossNavyBlueCottonT-Shirt.jpg?v=1740994598&width=1000',
      price: 299,
      description:
        'Classic cotton T-shirt with a soft, breathable fabric and modern fit — perfect for everyday comfort and style.',
      rating: 3,
    },
    {
      id: 2,
      name: 'Shoes',
      image:
        'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRcj-ebglgp4-9K4_r2HUoUY7uttkfQB3ASQcwEFnv5IJC51ZtfPcb0w4BsasN0SMkkjfGvLhils6c6ULT0UK3mqZ4KGRqttsbPb8yns6vKSrwRonEdSm5aIqU',
      price: 799,
      description:
        'Lightweight and durable sneakers designed for all-day wear, with cushioned soles and breathable mesh upper.',
      rating: 4,
    },
    {
      id: 3,
      name: 'Watch',
      image: 'https://m.media-amazon.com/images/I/616jllf33ZL._UY1000_.jpg',
      price: 999,
      description:
        'Sleek analog watch with a stainless-steel case and water-resistant design, combining style and precision.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Cap',
      image:
        'https://www.shutterstock.com/image-photo/plain-purple-baseball-cap-isolated-600nw-2540750647.jpg',
      price: 149,
      description:
        'Adjustable baseball cap made from premium cotton, featuring a curved brim and embroidered logo for a sporty look.',
      rating: 2,
    },
    {
      id: 5,
      name: 'Bag',
      image: 'https://m.media-amazon.com/images/I/81PtF30TLUL._UY1100_.jpg',
      price: 499,
      description:
        'Versatile backpack with multiple compartments, padded straps, and water-resistant material — ideal for work or travel.',
      rating: 1,
    },
    {
      id: 6,
      name: 'Sunglasses',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHTSbD3EVLf3-ZESsX9YbUIknHrUKG2jc8sA&s',
      price: 699,
      description:
        'UV-protected polarized sunglasses with scratch-resistant lenses and a lightweight frame for maximum eye comfort and style.',
      rating: 5,
    },
  ];

  constructor(
    private cartService: CartService,
    public responsiveService: ResponsiveService
  ) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
