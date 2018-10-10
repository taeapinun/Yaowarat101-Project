import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './product/products.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { CartsComponent } from './cart/cart.component';

import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { OrderComponent } from './order/order.component';
import { PromotionComponent } from './promotion/promotion.component';
import { ContentComponent } from './content/content.component';
import { TryproductComponent } from './tryproduct/tryproduct.component';
import { RedeemrewardComponent } from './redeemreward/redeemreward.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:category', component: ProductsComponent },
  { path: 'carts', component: CartsComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'order', component: OrderComponent },
  { path: 'promotion', component: PromotionComponent},
  { path: 'content', component: ContentComponent},
  { path: 'tryproduct', component: TryproductComponent},
  { path: 'redeemreward', component: RedeemrewardComponent},
  { path: 'subscription', component: SubscriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
