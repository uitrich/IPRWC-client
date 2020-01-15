import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpService} from '../services/http.service';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  valid = true;
  mailAddress = '';
  password = '';
  loggedIn = false;
  onSubmit() {
    this.authenticationService.logIn(this.mailAddress, this.password).subscribe(success => {
      if(success){
        this.router.navigate(['/']);
        this.authenticationService.getAccountFromServer();
      }
    });
  }
  mailKeyUp(event: any) {
    this.mailAddress = event.target.value;
  }
  passwordKeyUp(event: any) {
    this.password = event.target.value;
  }
  constructor(private httpService: HttpService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authenticationService.checkLoggedInStatus().subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/']);
      }
    });
  }
}
