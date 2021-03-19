import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Product} from '../../model/Product.model';
import {Account} from '../../model/Account.model';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent implements OnInit {
  loaded = false;
  accounts: object[] = [];
  newAccount = new Account('', '' , '', '', '', '', '' );
  selectedAccount = new Account('', '' , '', '', '', '', '' );
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAll().subscribe(data => {
      this.accounts = data;
      this.loaded = true;
    });
  }

  remove(sure: MDBModalRef) {
    this.accountService.delete(this.selectedAccount.mailAddress).subscribe(data => sure.hide());
    this.accountService.getAll().subscribe(data => this.accounts = data);
  }

  update(edit: any) {
    this.accountService.put(this.selectedAccount).subscribe(data => edit.hide());
  }

  post(add: any) {
    this.accountService.post(this.newAccount).subscribe(data => add.hide());
  }
  checkThis() {
    console.log(this);
  }
}
