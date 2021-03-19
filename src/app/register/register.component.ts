import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';
import {Account} from '../model/Account.model';
import {AccountService} from '../services/account.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Validator} from '../BackendValidatorHandler/Validator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  account: Account = new Account('','','','','', '', '');
  ValidationBooleans =  {
    password: false,
    mailAddress: false
  };
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  onsubmit() {
    const account = {
      mailAddress: this.account.mailAddress,
      firstName: this.account.firstName,
      password: this.account.password,
      lastName: this.account.lastName,
      postalCode: this.account.postalCode,
      houseNumber: this.account.houseNumber
    };
    this.accountService.post(account).subscribe(data => {
        this.router.navigate(['/login'], { queryParams: { email: account.mailAddress } });
      },
      error => {
        const err: HttpErrorResponse = error as HttpErrorResponse;
        Validator.ClassifyBackendResponse(err.error.errors.toString()).forEach((value) => {
          if (value === 'password') {
            this.ValidationBooleans.password = true;
          }
          if (value === 'mailAddress') {
            this.ValidationBooleans.mailAddress = true;
          }
        });
      });
    }
  }
