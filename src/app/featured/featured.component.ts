import {Component, OnInit} from '@angular/core';
import {Product} from '../model/Product.model';
import {AuthenticationService} from '../services/authentication.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  products: any[];
  length: number;
  loggedIn: boolean;

  constructor(private readonly productService: ProductService, private readonly authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.loggedIn = this.authenticationService.accountId !== '';
    this.authenticationService.loggedInStatusChanged.subscribe((status) => {
      this.loggedIn = status;
    });
    this.getProducts();
  }
  getProducts() {
    this.productService.getTop(3).subscribe(data => {
        this.products = data as Product[];
      }
    );
  }
}
