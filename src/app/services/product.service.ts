import { Injectable, signal } from '@angular/core';

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string; // data URL (bw placeholder)
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly productsSignal = signal<Product[]>([
    this.create('1', 'Monochrome Hoodie', 59, 'Cozy black & white hoodie'),
    this.create('2', 'BW Sneakers', 89, 'Crisp white with black accents'),
    this.create('3', 'Minimal Tee', 25, 'Ultra-soft cotton tee'),
    this.create('4', 'Contrast Cap', 22, 'Adjustable monochrome cap'),
    this.create('5', 'BW Backpack', 74, 'Functional everyday backpack'),
    this.create('6', 'Stripe Socks', 12, 'Thin striped socks'),
  ]);

  products = this.productsSignal.asReadonly();

  getById(id: string): Product | undefined {
    return this.productsSignal().find(p => p.id === id);
  }

  private create(id: string, title: string, price: number, description: string): Product {
    // simple black & white SVG placeholder image encoded as data URL
    const svg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>` +
      `<rect width='100%' height='100%' fill='white'/>` +
      `<rect x='0' y='0' width='600' height='400' fill='none' stroke='black' stroke-width='8'/>` +
      `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='28' font-family='sans-serif' fill='black'>${title}</text>` +
      `</svg>`
    );
    return { id, title, price, description, image: `data:image/svg+xml;charset=utf-8,${svg}` };
  }
}


