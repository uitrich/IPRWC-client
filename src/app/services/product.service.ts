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
    console.log('delete' + id);
    return this.httpClient.delete(environment.apiUrl + 'api/product/' + id);
  }

  search(page: number, search: string, category: string, company: string, bodyLocation: string ) {
    return this.httpClient.get(environment.apiUrl + 'api/product',
      {params: this.getCorrectParams(page, search, category, company, bodyLocation)}
      );
  }
  getCorrectParams(page, search, category, company, bodyLocation) {
    const result = new HttpParams();
    if (page === undefined) { result.set('page', page.toString()); }
    if (page === undefined) {  result.set('search', search); }
    if (page === undefined) { result.set('category', category); }
    if (page === undefined) { result.set('company', company); }
    if (page === undefined) { result.set('bodyLocation', bodyLocation); }
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
    console.log(object);
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
