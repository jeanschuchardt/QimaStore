import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../services/product.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>; 

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'categoryPath', 'available', 'actions'];

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.products$ = this.productService.products$;
  }

  ngOnInit(): void {
    this.productService.loadProducts();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.snackBar.open('product removido com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this.productService.loadProducts();
      },
      error: (err) => {
        const msg = err.status === 404
          ? 'product já foi removido anteriormente.'
          : 'Erro ao deletar product.';
        this.snackBar.open(msg, 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  buildCategoryPath(category: any): string {
    const path: string[] = [];
    let current = category;
    while (current) {
      path.unshift(current.name);
      current = current.subcategories?.[0];
    }
    return path.join(' > ');
  }
}
