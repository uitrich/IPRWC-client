import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Account} from '../model/Account.model';
import {SessionState} from '../model/SessionState.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _loggedIn = false;
  private _lastActivity: Date;
  private _accountId = '';
  private _account: Account;

  loggedInStatusChanged = new Subject<boolean>();
  roleChanged = new BehaviorSubject<String>(null);

  private autoLogOutTimer = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService) {

  }

  // Function to login, returns a subscription that returns true of false.
  logIn(mailAddress: string, password: string) {
    return this.http.post(environment.apiUrl + 'api/authentication', {mailAddress, password}).pipe(
      catchError(error => of(error)),
      map(data => {
        if (data.status) {
          this.loggedInStatusChanged.next(false);
          return false;
        } else {
          this._loggedIn = data.valid;
          this._accountId = data.accountId;
          this._lastActivity = new Date(data.lastActivity);
          this.autoLogOut();
          this.loggedInStatusChanged.next(true);
          return true;
        }
      })
    );
  }

  checkLoggedInStatus() {
    return this.http.get<SessionState>(environment.apiUrl + 'api/authentication').pipe(
      tap((data: SessionState) => {
        if (data.valid) {
          this._accountId = data.accountId;
          this._lastActivity = new Date(data.lastActivity);
          this.loggedInStatusChanged.next(true);
          this.getAccountFromServer();
        } else {
          this.loggedInStatusChanged.next(false);
        }
      }),
      catchError(error => of(error)),
      map((data) => {
        if (data && data.valid) {
          return true;
        } else {
          this.loggedInStatusChanged.next(false);
          return false;
        }
      })
    );
  }

  get loggedIn() {
    return this._loggedIn;
  }

  get accountId() {
    return this._accountId;
  }



  getAccountFromServer() {
    return this.http.get<Account>(environment.apiUrl + 'api/account').subscribe(data => {
      this._account = data;
      if (this._account.groups[0]) {
         this.roleChanged.next(this._account.groups[0].name);
       }
    });
  }

  get account() {
    if (this._account === null) {
      this.getAccountFromServer();
    }
    return this._account;
  }



  autoLogOut() {
    if (this.autoLogOutTimer !== null) {
      clearTimeout(this.autoLogOutTimer);
    }

    this.autoLogOutTimer = setTimeout(() => {
      this.logout();
      this.router.navigate(['login']);
    }, 7200000);
  }

  logout() {
    this.http.delete(environment.apiUrl + 'api/authentication').subscribe(data => {
      this._loggedIn = false;
      this._lastActivity = null;
      this._accountId = '';
      this.loggedInStatusChanged.next(false);
      this.roleChanged.next('none');
    });
  }
}
