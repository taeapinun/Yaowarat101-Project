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



//Filter
import { SearchProductFilterPipe } from './product/searchProductFilter.pipe';
import { UserComponent } from './user/user.component';

import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider } from 'angular-6-social-login'
import { UserService } from './user/user.service';

import { StorageServiceModule } from 'angular-webstorage-service';
import { HomeComponent } from './home/home.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md'

import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations'
import { MatSelectModule, MatInputModule } from '@angular/material';
import { ContactComponent } from './contact/contact.component'
import { LinkApi } from './app.link-api';

import { FileUploadModule } from 'ng2-file-upload';
import { OrderComponent } from './order/order.component';
import { OrderService } from './order/order.service';
import { PromotionComponent } from './promotion/promotion.component';
import { ContentComponent } from './content/content.component';

import { FacebookModule } from 'ngx-facebook';
import { TryproductComponent } from './tryproduct/tryproduct.component';
import { RedeemrewardComponent } from './redeemreward/redeemreward.component';
import { SubscriptionComponent } from './subscription/subscription.component';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2'

import { AppService } from './app.service';
import { AngularDraggableModule } from 'angular2-draggable';

import { NgxEditorModule } from 'ngx-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// import { NgxAlertsModule } from '@ngx-plus/ngx-alerts';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2230137083687285")
        }
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
    StorageServiceModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatInputModule,
    FileUploadModule,
    FacebookModule.forRoot(),
    SweetAlert2Module.forRoot(),
    AngularDraggableModule,
    NgxEditorModule,
    TooltipModule
    // NgxAlertsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    SearchProductFilterPipe,
    CartsComponent,
    UserComponent,
    HomeComponent,
    ContactComponent,
    OrderComponent,
    PromotionComponent,
    ContentComponent,
    TryproductComponent,
    RedeemrewardComponent,
    SubscriptionComponent
  ],
  providers: [
    ProductService,
    CartService,
    UserService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    OrderService,
    AppService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
