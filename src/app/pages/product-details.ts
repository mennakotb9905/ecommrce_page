import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly products = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  product = computed(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    return this.products.getById(id);
  });

  quantity = signal(1);
  isWishlisted = computed(() => {
    const product = this.product();
    return product ? this.cart.isInWishlist(product.id) : false;
  });

  addToCart(): void {
    const product = this.product();
    if (product) this.cart.add(product, this.quantity());
  }

  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/checkout']);
  }

  goCart(): void {
    this.router.navigate(['/cart']);
  }

  increaseQty(): void {
    this.quantity.update(q => q + 1);
  }

  decreaseQty(): void {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  toggleWishlist(): void {
    const product = this.product();
    if (product) {
      this.cart.toggleWishlist(product);
    }
  }

  relatedProducts() {
    return this.products.products().filter(p => p.id !== this.product()?.id).slice(0, 4);
  }
}


