import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductViewComponent} from './product-view.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ProductViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductViewComponent
  ]
})
export class ProductViewModule { }
