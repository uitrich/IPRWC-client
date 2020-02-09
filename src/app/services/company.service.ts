import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../model/Product.model';
import {Company} from '../model/Company.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private httpClient: HttpClient) {}

  getAll() { return this.httpClient.get<Company[]>(environment.apiUrl + 'api/company')}

  get(id: number) {
    return this.httpClient.get<Company>(environment.apiUrl + 'api/company/' + id);
  }

  post(company: Company) {
    return this.httpClient.post(environment.apiUrl + 'api/company', company.toObject());
  }

  put(company: Company) {
    return this.httpClient.put(environment.apiUrl + 'api/company', company.toObject());
  }

  delete(id: number) {
    return this.httpClient.delete(environment.apiUrl + 'api/company/' + id);
  }
}
