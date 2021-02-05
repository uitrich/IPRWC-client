import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../model/Product.model';
import {Account} from '../model/Account.model';
import {HttpClient} from '@angular/common/http';
import {Company} from '../model/Company.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  getAll() { return this.httpClient.get<Object[]>(environment.apiUrl + 'api/account/admin'); }

  get(mailAdress: string) {
    return this.httpClient.get<Account>(environment.apiUrl + 'api/account/admin/' + mailAdress);
  }

  post(account) {
    return this.httpClient.post(environment.apiUrl + 'api/account/makeAccount', account);
  }

  put(account: Account) {
    return this.httpClient.put(environment.apiUrl + 'api/account/admin/update', account);
  }

  delete(mailAdress: string) {
    return this.httpClient.delete(environment.apiUrl + 'api/account/admin/delete/' + mailAdress);
  }
}
