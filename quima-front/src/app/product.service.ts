import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryPath: string;
  available: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private currentId = 1;

  constructor() {
    this.loadFromStorage();
  }

  get products(): Product[] {
    return this.productsSubject.value;
  }

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct: Product = {
      ...product,
      id: this.currentId++
    };
    const updated = [...this.products, newProduct];
    this.productsSubject.next(updated);
    this.saveToStorage(updated);
  }

  updateProduct(updatedProduct: Product) {
    const updated = this.products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    this.productsSubject.next(updated);
    this.saveToStorage(updated);
  }

  deleteProduct(id: number) {
    const updated = this.products.filter(p => p.id !== id);
    this.productsSubject.next(updated);
    this.saveToStorage(updated);
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  // 💾 Persistência em localStorage
  private saveToStorage(products: Product[]) {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('productId', this.currentId.toString());
  }

  private loadFromStorage() {
    const data = localStorage.getItem('products');
    const id = localStorage.getItem('productId');
    if (data) {
      const parsed = JSON.parse(data);
      this.productsSubject.next(parsed);
    }
    if (id) {
      this.currentId = parseInt(id, 10);
    }
  }
}
