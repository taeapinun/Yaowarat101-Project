import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductService } from './product/product.service';
import { ProductsComponent } from './product/products.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { CartService } from './cart/cart.service';
import { CartsComponent } from './cart/cart.component';
import { CartDetailComponent } from './cart/cart-detail.component';



//Filter
import { SearchProductFilterPipe } from './product/searchProductFilter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    SearchProductFilterPipe,
    CartsComponent,
    CartDetailComponent,
  ],
  providers: [
    ProductService,
    CartService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
