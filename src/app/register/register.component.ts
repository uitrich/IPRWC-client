import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';
import {Account} from '../model/Account.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  mailaddress: string;
  firstname: string;
  password: string;
  lastname: string;
  postal_code: string;
  house_number: string;
  error = false;
  success = false;
  constructor(private httpService: HttpService) { }

  isValid() {
    if (this.mailaddress === '' || this.firstname === '' || this.lastname === '' || this.password === '' || this.postal_code === '' || this.house_number === '') {
      this.error = true;
      return false;
    }
    return true;
  }
  ngOnInit() {
  }

  onsubmit() {
    const account = {
      mailAddress: this.mailaddress,
      firstName: this.firstname,
      passwordHash: this.password,
      lastName: this.lastname,
      postal_code: this.postal_code,
      house_number: this.house_number,
      reference: 'Role_Customer'};
    if (this.isValid()) {
      this.httpService.makePostRequest('api/account/makeAccount', account).subscribe(data => {
        this.success = data as boolean;
      });
    } else {
      console.log('invalid', account);
    }
  }
}
