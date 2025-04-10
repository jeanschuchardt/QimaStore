import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ProductCreationComponent } from '../product-creation/product-creation.component';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    ProductCreationComponent,
    NgIf
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'categoryPath', 'available', 'actions'];
  products: Product[] = [];
  selectedProduct?: Product;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    // Escuta atualizações de produtos
    this.productService.products$.subscribe((prodList: Product[]) => {
      this.products = prodList;
    });

    // Recarrega produtos ao voltar para /products
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/') {
          this.productService.loadProducts();
        }
      });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
    console.log('Produto removido com ID:', id);
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
  }

  onFormSubmitted() {
    this.selectedProduct = undefined;
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
