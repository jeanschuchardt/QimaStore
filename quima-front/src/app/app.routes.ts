import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  //protected  routes 
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: ProductListComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/edit/:id', component: ProductCreationComponent },
      { path: 'products/new', component: ProductCreationComponent },
    ]
  },

  // fallback
  { path: '**', redirectTo: '' }
];
