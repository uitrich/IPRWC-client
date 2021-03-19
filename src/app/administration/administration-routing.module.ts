import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductManagerComponent} from './product-manager/product-manager.component';
import {AccountManagerComponent} from './account-manager/account-manager.component';

const routes: Routes = [
  {
    path: 'product',
    component: ProductManagerComponent,
  },
  {
    path: 'account',
    component: AccountManagerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
