import { Injectable, computed, signal } from '@angular/core';
import type { Product } from './product.service';

export type CartItem = { product: Product; quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>([]);
  private readonly wishlistSignal = signal<Product[]>([]);

  readonly items = this.itemsSignal.asReadonly();
  readonly wishlist = this.wishlistSignal.asReadonly();
  readonly totalQuantity = computed(() => this.itemsSignal().reduce((s, i) => s + i.quantity, 0));
  readonly subtotal = computed(() => this.itemsSignal().reduce((s, i) => s + i.product.price * i.quantity, 0));
  readonly wishlistCount = computed(() => this.wishlistSignal().length);

  add(product: Product, quantity: number = 1): void {
    const items = this.itemsSignal();
    const existing = items.find(i => i.product.id === product.id);
    if (existing) existing.quantity += quantity; else items.push({ product, quantity });
    this.itemsSignal.set([...items]);
  }

  remove(productId: string): void {
    this.itemsSignal.set(this.itemsSignal().filter(i => i.product.id !== productId));
  }

  update(productId: string, quantity: number): void {
    const items = this.itemsSignal();
    const item = items.find(i => i.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.remove(productId);
      } else {
        item.quantity = quantity;
        this.itemsSignal.set([...items]);
      }
    }
  }

  clear(): void {
    this.itemsSignal.set([]);
  }

  // Wishlist methods
  addToWishlist(product: Product): void {
    const wishlist = this.wishlistSignal();
    if (!wishlist.find(p => p.id === product.id)) {
      this.wishlistSignal.set([...wishlist, product]);
    }
  }

  removeFromWishlist(productId: string): void {
    this.wishlistSignal.set(this.wishlistSignal().filter(p => p.id !== productId));
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistSignal().some(p => p.id === productId);
  }

  toggleWishlist(product: Product): void {
    if (this.isInWishlist(product.id)) {
      this.removeFromWishlist(product.id);
    } else {
      this.addToWishlist(product);
    }
  }

  clearWishlist(): void {
    this.wishlistSignal.set([]);
  }
}


