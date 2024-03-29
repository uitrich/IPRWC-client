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
  headElements: string[] = ['', 'name',  'quantity', 'price',  '', 'total price'];
  products: Product[];
  quantities: number[];
  totalPrice = 0;
  constructor(private readonly shoppingCartService: ShoppingCartService, private readonly router: Router) { }

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
        quantities.forEach(value => {
          this.products.forEach(value1 => {
           if (value1.id === value[1]) {
             value1.quantity = value[0];
             this.totalPrice += value1.price * value1.quantity;
           }
          });
        });
      }
    );
  }
  updateQuantity(id: number, index,  event: any) {
    this.shoppingCartService.postQty(id, event.target.value).subscribe(data => {
      this.products[index].quantity = data as number;
      this.getQuantity();
    });
  }

  order() {
    this.shoppingCartService.order().subscribe(data => {
      this.shoppingCartService.changeEmitter.emit(true);
      this.router.navigate(['']);
    });
  }
}
