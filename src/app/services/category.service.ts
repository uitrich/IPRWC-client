import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../model/Product.model';
import {Category} from '../model/Category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpService: HttpService) {}

  getAll() { return this.httpService.makeGetRequest('api/company')}

  get(id: number) {
    return this.httpService.makeGetRequest('api/company/' + id);
  }

  post(category: Category) {
    return this.httpService.makePostRequest('api/category', category.toObject());
  }

  put(category: Category) {
    return this.httpService.makePutRequest('api/category', category.toObject());
  }

  delete(id: number) {
    return this.httpService.makeDeleteRequest('api/category/' + id);
  }
}
