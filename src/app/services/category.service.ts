import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../model/Product.model';
import {Category} from '../model/Category.model';
import {HttpClient} from '@angular/common/http';
import {Company} from '../model/Company.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAll() { return this.httpClient.get<Category[]>(environment.apiUrl + 'api/category'); }

  get(id: number) {
    return this.httpClient.get<Category>(environment.apiUrl + 'api/category/' + id);
  }

  post(category: Category) {
    return this.httpClient.post(environment.apiUrl + 'api/category', category.toObject());
  }

  put(category: Category) {
    return this.httpClient.put(environment.apiUrl + 'api/category', category.toObject());
  }

  delete(id: number) {
    return this.httpClient.delete(environment.apiUrl + 'api/category/' + id);
  }
}
