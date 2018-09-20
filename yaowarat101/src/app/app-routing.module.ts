import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './product/products.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { CartsComponent } from './cart/cart.component';
import { CartDetailComponent } from './cart/cart-detail.component';

import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:category', component: ProductsComponent },
  { path: 'cartdetail/:id', component: CartDetailComponent },
  { path: 'carts', component: CartsComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
