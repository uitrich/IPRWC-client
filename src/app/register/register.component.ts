import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';
import {Account} from '../model/Account.model';
import {AccountService} from '../services/account.service';

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
  constructor(private accountService: AccountService) { }

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
      password: this.password,
      lastName: this.lastname,
      postalCode: this.postal_code,
      houseNumber: this.house_number
    };
    if (this.isValid()) {
      this.accountService.post(account).subscribe(data => {
        this.success = data as boolean;
      });
    } else {
      console.log('invalid', account);
    }
  }
}
