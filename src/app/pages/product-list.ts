import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, type Product } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  animations: [
    trigger('card', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProductListPage {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);

  products = this.productService.products;

  addToCart(product: Product): void {
    this.cart.add(product, 1);
  }

  toggleWishlist(product: Product): void {
    this.cart.toggleWishlist(product);
  }

  isInWishlist(productId: string): boolean {
    return this.cart.isInWishlist(productId);
  }
}


