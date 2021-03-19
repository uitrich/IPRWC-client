import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from './search/search.component';
import {LoginComponent} from './login/login.component';
import {FeaturedComponent} from './featured/featured.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'shoppingcart', component: ShoppingCartComponent},
  {path: '', component: FeaturedComponent},
  {
    path: 'administration',
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
