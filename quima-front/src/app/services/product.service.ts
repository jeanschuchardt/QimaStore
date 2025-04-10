import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CategoryService } from './category.service';



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
  categoryPath?: string; // se ainda estiver usando
  categoryId?: number; // usado no form
  categoryChain?: Category; // ✅ adicione este campo opcional
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
    this.loadProducts(); // ✅ já busca os produtos assim que o serviço é criado
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

  deleteProduct(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => {
      // Após deletar, recarrega a lista
      this.loadProducts();
    });
  }

  buildCategoryPath(category: any): string {
    const path: string[] = [];
  
    function traverse(cat: any) {
      if (!cat) return;
      if (cat.subcategories?.length) {
        traverse(cat.subcategories[0]); // usa apenas o primeiro caminho da árvore
      }
      path.unshift(cat.name); // insere no início para montar do nível mais alto ao mais baixo
    }
  
    traverse(category);
    return path.join(' > ');
  }
  
}
