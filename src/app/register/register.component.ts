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
export class RegisterComponent {
  account: Account = new Account('', '', '', '', '', '', '');
  ValidationBooleans = {
    password: false,
    mailAddress: false,
    error: false
  };

  constructor(private readonly accountService: AccountService, private readonly router: Router) {
  }

  onsubmit() {
    const account = this.accountService.getRequestObject(this.account);
    this.accountService.post(account).subscribe(data => {
        this.router.navigate(['/login'], {queryParams: {email: account.mailAddress}});
      },
      error => {
        debugger;
        const err: HttpErrorResponse = error as HttpErrorResponse;
        try {
          Validator.ClassifyBackendResponse(err.error.errors.toString()).forEach((value) => {
            if (value === 'password') {
              this.ValidationBooleans.password = true;
            }
            if (value === 'mailAddress') {
              this.ValidationBooleans.mailAddress = true;
            }
          });
        } catch (e) {
          // ignore
        }
        if (!(this.ValidationBooleans.password || this.ValidationBooleans.mailAddress)) {
          this.ValidationBooleans.error = true;
        }
      });
  }
}
