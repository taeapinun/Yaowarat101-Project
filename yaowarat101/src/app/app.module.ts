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
import { UserComponent } from './user/user.component';

import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider } from 'angular-6-social-login'


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2230137083687285")
        },
        // {
        //   id: GoogleLoginProvider.PROVIDER_ID,
        //   provider: new GoogleLoginProvider("Your-Google-Client-Id")
        // },
      ]
  );
  return config;
}



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
  ],
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    SearchProductFilterPipe,
    CartsComponent,
    CartDetailComponent,
    UserComponent,
  ],
  providers: [
    ProductService,
    CartService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
