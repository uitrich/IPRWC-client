import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Subscription} from 'rxjs';
import {ShoppingCartService} from '../services/shoppingcart.service';
import {Product} from '../model/Product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  loggedInSub: Subscription;
  roleChangedSub: Subscription;
  admin = false;
  shoppingCartQuantity = 0;

  constructor(private readonly router: Router,
              private readonly authenticationService: AuthenticationService,
              private readonly shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.loggedInSub = this.authenticationService.loggedInStatusChanged.subscribe((status) => {
      this.loggedIn = status;
      this.getQuantity();
    });

    this.roleChangedSub = this.authenticationService.roleChanged.subscribe((newRole) => {
      this.admin = newRole === 'Admin';
    });
    this.shoppingCartService.changeEmitter.subscribe(value => {
      this.shoppingCartService.get().subscribe(data => {
        this.getQuantity();
      });
    });
  }
  getQuantity() {
    this.shoppingCartService.get().subscribe(data => {
      this.shoppingCartQuantity = (data as Product[]).length;
    });
  }

  onSubmit(event: any) {
    this.router.navigate(['/search'], { queryParams: { search: event.target.value } });
  }

  logout() {
    return this.authenticationService.logout();
  }
}
