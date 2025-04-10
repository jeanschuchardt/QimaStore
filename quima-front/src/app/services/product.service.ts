import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  subcategories: Category[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  categoryPath?: string; 
  categoryId?: number; 
  categoryChain?: Category; 
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/products';

  private _products$ = new BehaviorSubject<Product[]>([]);
  public products$ = this._products$.asObservable();

  constructor() {
    this.loadProducts(); 
  }
  

  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl)
      .subscribe(products => this._products$.next(products));
  }
  

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buildCategoryPath(category: any): string {
    const path: string[] = [];
  
    function traverse(cat: any) {
      if (!cat) return;
      if (cat.subcategories?.length) {
        traverse(cat.subcategories[0]); 
      }
      path.unshift(cat.name);
    }
  
    traverse(category);
    return path.join(' > ');
  }
  
}
