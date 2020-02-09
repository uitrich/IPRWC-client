import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../model/Product.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpService: HttpService, private httpClient: HttpClient) {
  }

  getAll(page: number, category: string, company: string, bodyLocation: string, search) {
    const categoryString = category !== '' ? '&category=' + category : '';
    const companyString = company !== '' ? '&company=' + company : '';
    const bodyLocationString = bodyLocation !== '' ? '&body_location=' + bodyLocation : '';
    const searchString = search !== '' ? '&search=' + search : '';
    return this.httpService.makeGetRequest('api/product?page='
      + page + searchString + categoryString + companyString + bodyLocationString + '&page-size=30');
  }
  getAllAdmin() {
    return this.httpClient.get<Product[]>(environment.apiUrl + 'api/product/admin');
  }

  get(id: number) {
    return this.httpService.makeGetRequest('api/product/' + id);
  }

  post(product: Product) {
    return this.httpService.makePostRequest('api/product', this.toNewObject(product));
  }

  put(product: Product) {
    return this.httpService.makePutRequest('api/product', this.toObject(product));
  }

  delete(id: number) {
    console.log('delete' + id);
    return this.httpClient.delete(environment.apiUrl + 'api/product/' + id);
  }

  toObject(product: Product) {
    let object = {
      name: product.name,
      price: product.price,
      body_location: product.body_location,
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
      body_location: {id: product.body_location.id, name: product.body_location.name},
      category: {id: product.category.id, name: product.category.name},
      company: {id: product.company.id, name: product.company.name},
      image: product.image
    };
  }
}
