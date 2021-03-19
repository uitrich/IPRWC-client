import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';
import {Product} from '../model/Product.model';
import {ShoppingCartService} from '../services/shoppingcart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  headElements = ['', 'name',  'quantity', 'price',  '', 'total price'];
  products: Product[];
  quantities: number[];
  totalPrice = 0;
  constructor(private httpService: HttpService, private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit() {
    this.getCart();
  }
  getCart() {
    this.shoppingCartService.get().subscribe(data => {
      this.products = data as Product[];
      this.getQuantity();
    });
  }
  remove(id: number) {
    this.quantities = [];
    this.shoppingCartService.delete(id).subscribe(data => {
      this.getCart();
    });
  }

  getQuantity() {
    this.quantities = [];
    this.totalPrice = 0;
    return this.shoppingCartService.getQuantity().subscribe(
      data => {
        const quantities = data as number[][];
        for (let i = 0; i <  this.products.length; i++) {
          this.products[i].quantity = quantities[i][0];
          this.totalPrice += this.products[i].price * quantities[i][0];
          this.quantities.push(this.products[i].quantity);
        }
      }
    );
  }
  updateQuantity(id: number, index,  event: any) {
    this.shoppingCartService.postQty(id, event.target.value).subscribe(data => {
      this.products[index].quantity = data as number;
      this.getQuantity();
    });
  }
  getSubSubTotal(product: Product) {
    return (product.quantity * product.price).toFixed(2);
  }
  deleteAll() {
    this.shoppingCartService.deleteAll().subscribe(data => {
      this.shoppingCartService.changeEmitter.emit(true);
      this.router.navigate(['']);
    });
  }
}
