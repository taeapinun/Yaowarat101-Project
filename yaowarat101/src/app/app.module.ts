import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductService } from './services/product.service';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './product-detail.component';



//Filter
import { SearchProductFilterPipe } from './searchProductFilter.pipe';

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
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
