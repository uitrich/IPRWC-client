import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import {FormsModule} from '@angular/forms';
import {ProductViewComponent} from '../product-view/product-view.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AppModule} from '../app.module';
import {ProductViewModule} from '../product-view/product-view.module';
import {AlifeFileToBase64Module} from 'alife-file-to-base64';


@NgModule({
  declarations: [
    ProductManagerComponent,
    AccountManagerComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    ProductViewModule,
    AlifeFileToBase64Module
  ]
})
export class AdministrationModule { }
