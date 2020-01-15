import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';
import {Product} from '../model/Product.model';

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
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.makeGetRequest('api/shoppingcart').subscribe(data => {
      this.products = data as Product[];
      console.log(this.products);
      this.getQuantity();
    });
  }

  remove(id: number) {
    this.quantities = [];
    this.httpService.makeDeleteRequest('api/shoppingcart/' + id).subscribe(data => {
      this.products = data as Product[];
      this.getQuantity();
      this.totalPrice = 0;
      this.products.forEach(value => {
        this.totalPrice += (value.quantity * value.price);
      });
    });
  }

  getQuantity() {
    this.quantities = [];
    this.httpService.makeGetRequest('api/shoppingcart/quantity').subscribe(
      data => {
        const quantities = data as number[][];
        for (let i = 0; i <  this.products.length; i++) {
          this.products[i].quantity = quantities[i][0];
          this.totalPrice = this.products[i].price * quantities[i][0];
          this.quantities.push(this.products[i].quantity);
        }
      }
    );
  }
  updateQuantity(id: number, index,  event: any) {
    this.httpService.makePostRequest('api/shoppingcart/updatequantity/' + id + '/' + event.target.value, '').subscribe(data => {
      this.products[index].quantity = data as number;
    });
  }
  getSubSubTotal(product: Product) {
    return (product.quantity * product.price).toFixed(2);
  }
}
