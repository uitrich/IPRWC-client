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
import { AdminComponent } from './admin/admin.component';
import { ProductManagerComponent } from './admin/product-manager/product-manager.component';
import { AccountManagerComponent } from './admin/account-manager/account-manager.component';
import {AlifeFileToBase64Module} from 'alife-file-to-base64';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FeaturedComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    ProductViewComponent,
    PaginationComponent,
    CategoryHeaderComponent,
    ShoppingCartComponent,
    SearchCompanyComponent,
    AdminComponent,
    ProductManagerComponent,
    AccountManagerComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,                             // <========== Add this line!
    ReactiveFormsModule,
    AlifeFileToBase64Module
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
