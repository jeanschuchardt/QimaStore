import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ProductCreationComponent } from '../product-creation/product-creation.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule,ProductCreationComponent, NgIf,RouterModule,MatTooltipModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'categoryPath', 'available', 'actions'];

  products: Product[] = [];

  selectedProduct?: Product;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.products$.subscribe(prodList => {
      this.products = prodList;
    });
  }

  editProduct(product: Product) {
    console.log('Editar produto:', product);
    this.selectedProduct = product;
    // Aqui você pode emitir um evento, navegar para outra rota ou abrir um modal
  }
  
  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
    console.log('Produto removido com ID:', id);
  }                                                                                                                         
  
  onFormSubmitted() {
    this.selectedProduct = undefined;
  }
}
