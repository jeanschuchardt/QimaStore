import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products/new', component: ProductCreationComponent },
  { path: 'products/edit/:id', component: ProductCreationComponent },
];
