import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from './search/search.component';
import {LoginComponent} from './login/login.component';
import {FeaturedComponent} from './featured/featured.component';


const routes: Routes = [
  {path: 'search/:query', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: FeaturedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
