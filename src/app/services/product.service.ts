import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../model/Product.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) {
  }

  getAllAdmin() {
    return this.httpClient.get<Product[]>(environment.apiUrl + 'api/product/admin');
  }

  get(id: number) {
    return this.httpClient.get<Product>(environment.apiUrl + 'api/product/' + id);
  }

  getTop(featuredAmount) {
    return this.httpClient.get<Product[]>('api/product/top/' + 3)
  }

  post(product: Product) {
    return this.httpClient.post<Product>(environment.apiUrl + 'api/product', this.toNewObject(product));
  }

  put(product: Product) {
    return this.httpClient.put(environment.apiUrl + 'api/product', this.toObject(product));
  }

  delete(id: number) {
    return this.httpClient.delete(environment.apiUrl + 'api/product/' + id);
  }

  search(page: number, search: string, category: string, company: string, bodyLocation: string ) {
    return this.httpClient.get(environment.apiUrl + 'api/product',
      {params: this.getCorrectParams(page, search, category, company, bodyLocation)}
      );
  }
  getCorrectParams(page: number, search: string, category: string, company: string, bodyLocation: string) {
    let result = new HttpParams();
    if (page !== undefined) {result = result.set('page', page.toString()); }
    if (search !== undefined) { result = result.set('search', search); }
    if (category !== undefined) {result = result.set('category', category); }
    if (company !== undefined) { result = result.set('company', company); }
    if (bodyLocation !== undefined) { result = result.set('bodyLocation', bodyLocation); }
    return result;
  }

  toObject(product: Product) {
    let object = {
      name: product.name,
      price: product.price,
      bodyLocation: product.bodyLocation,
      category: product.category,
      company: product.company,
      id: product.id,
      image: product.image,
    };
    return object;
  }
  toNewObject(product: Product) {
    return {
      name: product.name,
      price: product.price,
      bodyLocation: {id: product.bodyLocation.id, name: product.bodyLocation.name},
      category: {id: product.category.id, name: product.category.name},
      company: {id: product.company.id, name: product.company.name},
      image: product.image
    };
  }
}
