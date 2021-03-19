import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../model/Product.model';
import {HttpClient} from '@angular/common/http';
import {Company} from '../model/Company.model';
import {BodyLocation} from '../model/BodyLocation.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BodyLocationService {
  constructor(private httpClient: HttpClient) {}

  getAll() { return this.httpClient.get<BodyLocation[]>(environment.apiUrl + 'api/bodylocation'); }

  get(id: number) {
    return this.httpClient.get<BodyLocation>(environment.apiUrl + 'api/bodylocation/' + id);
  }

  post(bodyLocation: BodyLocation) {
    return this.httpClient.post(environment.apiUrl + 'api/bodylocation', {id: bodyLocation.id, name: bodyLocation.name});
  }

  put(bodyLocation: BodyLocation) {
    return this.httpClient.put(environment.apiUrl + 'api/bodylocation', {id: bodyLocation.id, name: bodyLocation.name});
  }

  delete(id: number) {
    return this.httpClient.delete(environment.apiUrl + 'api/bodylocation/' + id);
  }
}
