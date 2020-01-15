import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../model/Product.model';
import {Company} from '../model/Company.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpService: HttpService) {}

  getAll() { return this.httpService.makeGetRequest('api/company')}

  get(id: number) {
    return this.httpService.makeGetRequest('api/company/' + id);
  }

  post(company: Company) {
    return this.httpService.makePostRequest('api/company', company.toObject());
  }

  put(company: Company) {
    return this.httpService.makePutRequest('api/company', company.toObject());
  }

  delete(id: number) {
    return this.httpService.makeDeleteRequest('api/company/' + id);
  }
}
