import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartPage {
  private readonly cart = inject(CartService);
  private readonly productService = inject(ProductService);

  items = this.cart.items;
  totalQuantity = this.cart.totalQuantity;
  subtotal = this.cart.subtotal;

  inc(id: string): void { 
    this.cart.update(id, (this.items().find(i => i.product.id === id)?.quantity ?? 0) + 1); 
  }
  
  dec(id: string): void { 
    this.cart.update(id, (this.items().find(i => i.product.id === id)?.quantity ?? 0) - 1); 
  }
  
  remove(id: string): void { 
    this.cart.remove(id); 
  }

  clearCart(): void {
    this.cart.clear();
  }

  addToCart(product: any): void {
    this.cart.add(product, 1);
  }

  recommendedProducts() {
    return this.productService.products().slice(0, 3);
  }
}


