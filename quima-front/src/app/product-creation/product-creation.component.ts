import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ProductService, Product } from '../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService, Category } from '../services/category.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSelectModule,
    MatOptionModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements OnInit {
  productForm!: FormGroup;
  productToEdit?: Product;
  categories: (Category & { level?: number })[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required],
      available: [true]
    });

    this.categoryService.getAll().subscribe(categories => {
      this.categories = this.flattenCategoriesWithLevels(categories);

      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.productService.getById(+id).subscribe(product => {
          this.productToEdit = product;

          // ✅ Pegando o ID da category mais específica diretamente
          const categoryId = product.categoryChain?.id ?? null;

          this.productForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            available: product.available,
            categoryId
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const formValue = this.productForm.value;

    if (this.productToEdit) {
      this.productService.update(this.productToEdit.id, formValue).subscribe(() => {
        this.snackBar.open('product atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/']);
      });
    } else {
      this.productService.create(formValue).subscribe(() => {
        this.snackBar.open('product criado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/']);
      });
    }
  }

  private flattenCategoriesWithLevels(categories: Category[], level = 0): (Category & { level: number })[] {
    let result: (Category & { level: number })[] = [];

    for (const category of categories) {
      result.push({ ...category, level });

      if (category.subcategories?.length) {
        result = result.concat(this.flattenCategoriesWithLevels(category.subcategories, level + 1));
      }
    }

    return result;
  }

  indentCategory(level: number = 0): string {
    return '&nbsp;&nbsp;&nbsp;'.repeat(level);
  }
}
