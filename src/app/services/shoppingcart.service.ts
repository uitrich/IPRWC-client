import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private httpClient: HttpClient) {}

  changeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  get() {
    return this.httpClient.get(environment.apiUrl + 'api/shoppingcart');
  }

  getQuantity() {
    this.changeEmitter.emit(true);
    return this.httpClient.get(environment.apiUrl + 'api/shoppingcart/quantity');
  }

  delete(id: number) {
    this.changeEmitter.emit(true);
    return this.httpClient.delete(environment.apiUrl + 'api/shoppingcart/' + id);
  }
  deleteAll() {
    return this.httpClient.delete(environment.apiUrl + 'api/shoppingcart/full');
  }

  postQty(id: number, qty: any) {
    this.changeEmitter.emit(true);
    return this.httpClient.post(environment.apiUrl + 'api/shoppingcart/updatequantity/' + id + '/' + qty, '');
  }
  post(id: number) {
    this.changeEmitter.emit(true);
    return this.httpClient.post( environment.apiUrl + 'api/shoppingcart/' + id, '');
  }
  order() {
    return this.httpClient.post(environment.apiUrl + 'api/shoppingcart/order', '');
  }
}
