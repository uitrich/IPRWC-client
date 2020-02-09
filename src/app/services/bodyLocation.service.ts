import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Product} from '../model/Product.model';
import {HttpClient} from '@angular/common/http';
import {Company} from '../model/Company.model';
import {Body_Location} from '../model/Body_Location.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BodyLocationService {
  constructor(private httpClient: HttpClient) {}

  getAll() { return this.httpClient.get<Body_Location[]>(environment.apiUrl + 'api/bodylocation'); }

  get(id: number) {
    return this.httpClient.get<Body_Location>(environment.apiUrl + 'api/bodylocation/' + id);
  }

  post(body_location: Body_Location) {
    return this.httpClient.post(environment.apiUrl + 'api/bodylocation', {id: body_location.id, name: body_location.name});
  }

  put(body_location: Body_Location) {
    return this.httpClient.put(environment.apiUrl + 'api/bodylocation', {id: body_location.id, name: body_location.name});
  }

  delete(id: number) {
    return this.httpClient.delete(environment.apiUrl + 'api/bodylocation/' + id);
  }
}
