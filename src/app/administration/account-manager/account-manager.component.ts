import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Account} from '../../model/Account.model';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent implements OnInit {
  loaded = false;
  accounts: Account[] = [];
  newAccount = new Account('', '' , '', '', '', '', '' );
  selectedAccount = new Account('', '' , '', '', '', '', '' );
  constructor(private readonly accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAll().subscribe(data => {
      this.accounts = data;
      this.loaded = true;
    });
  }

  remove(sure: MDBModalRef) {
    this.accountService.delete(this.selectedAccount.mailAddress).subscribe(data => {
      sure.hide();
      this.accounts = this.accounts.filter(obj => obj !== this.selectedAccount);
    });
  }

  update(edit: any) {
    this.accountService.put(this.accountService.getRequestObject(this.selectedAccount)).subscribe(data => edit.hide());
  }
}
