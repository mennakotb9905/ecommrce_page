import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product-list').then(m => m.ProductListPage)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-details').then(m => m.ProductDetailsPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart').then(m => m.CartPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout').then(m => m.CheckoutPage)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/wishlist').then(m => m.WishlistPage)
  },
  { path: '**', redirectTo: '' }
];
