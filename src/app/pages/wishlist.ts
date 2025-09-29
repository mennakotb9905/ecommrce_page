import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class WishlistPage {
  private readonly cart = inject(CartService);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  wishlist = this.cart.wishlist;

  removeFromWishlist(productId: string): void {
    this.cart.removeFromWishlist(productId);
  }

  clearWishlist(): void {
    this.cart.clearWishlist();
  }

  addToCart(product: any): void {
    this.cart.add(product, 1);
  }

  buyNow(product: any): void {
    this.cart.add(product, 1);
    this.router.navigate(['/checkout']);
  }

  addAllToCart(): void {
    this.wishlist().forEach(product => {
      this.cart.add(product, 1);
    });
  }

  shareWishlist(): void {
    // Simple share functionality - in a real app, this would use Web Share API or social media APIs
    const wishlistText = `Check out my wishlist with ${this.wishlist().length} items!`;
    if (navigator.share) {
      navigator.share({
        title: 'My Wishlist',
        text: wishlistText,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(wishlistText + ' ' + window.location.href);
      alert('Wishlist link copied to clipboard!');
    }
  }

  getTotalValue(): number {
    return this.wishlist().reduce((total, product) => total + product.price, 0);
  }

  getAveragePrice(): number {
    const total = this.getTotalValue();
    return this.wishlist().length > 0 ? Math.round(total / this.wishlist().length) : 0;
  }

  recommendedProducts() {
    return this.productService.products().filter(p => 
      !this.wishlist().some(w => w.id === p.id)
    ).slice(0, 4);
  }
}
