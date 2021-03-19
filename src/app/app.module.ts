import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './header/header.component';
import { FeaturedComponent } from './featured/featured.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductViewComponent } from './product-view/product-view.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import { CategoryHeaderComponent } from './category-header/category-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {CookieService} from 'ngx-cookie-service';
import {RequestInterceptorService} from './shared/request-interceptor.service';
import { SearchCompanyComponent } from './search/search-company/search-company.component';
import { ProductManagerComponent } from './administration/product-manager/product-manager.component';
import { AccountManagerComponent } from './administration/account-manager/account-manager.component';
import {AlifeFileToBase64Module} from 'alife-file-to-base64';
import {AdministrationModule} from './administration/administration.module';
import {AdministrationRoutingModule} from './administration/administration-routing.module';
import {ProductViewModule} from './product-view/product-view.module';
import { ProductDetailViewComponent } from './product-detail-view/product-detail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FeaturedComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    PaginationComponent,
    CategoryHeaderComponent,
    ShoppingCartComponent,
    SearchCompanyComponent,
    ProductDetailViewComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,                             // <========== Add this line!
    ReactiveFormsModule,
    AlifeFileToBase64Module,
    AdministrationModule,
    ProductViewModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ],
  exports: [
    ProductViewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
