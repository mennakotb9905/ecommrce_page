import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutPage {
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  items = this.cart.items;
  subtotal = this.cart.subtotal;

  submit(form: NgForm): void {
    if (form.invalid) return;
    
    // Show success message
    alert('Order placed successfully!\nThank you for your purchase.\nYou will receive a confirmation email shortly.');
    
    // Clear cart and redirect
    this.cart.clear();
    this.router.navigate(['/']);
  }
}


