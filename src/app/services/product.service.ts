import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../model/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpService: HttpService) {}

  getAll(page: number, category: string, company: string, bodyLocation: string, search) {
    const categoryString = category !== '' ? '&category=' + category : '';
    const companyString = company !== '' ? '&company=' + company : '';
    const bodyLocationString = bodyLocation !== '' ? '&body_location=' + bodyLocation : '';
    const searchString = search !== '' ? '&search=' + search : '';
    return this.httpService.makeGetRequest('api/product?page='
      + page +  searchString + categoryString + companyString + bodyLocationString);
  }

  get(id: number) {
    return this.httpService.makeGetRequest('api/product/' + id);
  }

  post(product: Product) {
    return this.httpService.makePostRequest('api/product', product.toObject());
  }

  put(product: Product) {
    return this.httpService.makePutRequest('api/product', product.toObject());
  }

  delete(id: number) {
    return this.httpService.makeDeleteRequest('api/product/' + id);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =  () => {
      console.log(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
 }
