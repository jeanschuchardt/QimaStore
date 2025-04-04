import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ProductService, Product } from '../product.service';
import {ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-creation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements OnInit {
  @Input() productToEdit?: Product;
  @Output() formSubmitted = new EventEmitter<void>();

  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // ⚠️ Pega o ID da rota
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const product = this.productService.getProductById(+id);
      if (product) {
        this.productToEdit = product;
      }
    }

    // ⚠️ Cria o formulário APÓS buscar o produto
    this.productForm = this.fb.group({
      name: [this.productToEdit?.name || '', Validators.required],
      description: [this.productToEdit?.description || ''],
      price: [this.productToEdit?.price ?? 0, [Validators.required, Validators.min(0)]],
      categoryPath: [this.productToEdit?.categoryPath || ''],
      available: [this.productToEdit?.available ?? false]
    });
  }


   onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      if (this.productToEdit) {
        const updatedProduct: Product = {
          ...formValue,
          id: this.productToEdit.id // ✅ preserva o ID original
        };
        this.productService.updateProduct(updatedProduct);
      } else {
        this.productService.addProduct(formValue); // só entra aqui em caso de novo
      }

      this.router.navigate(['/']);
    }
  }
}
