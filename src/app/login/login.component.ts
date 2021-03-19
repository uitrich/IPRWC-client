import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpService} from '../services/http.service';
import {HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {error} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  valid = true;
  mailAddress = '';
  password = '';

  constructor(
              private readonly authenticationService: AuthenticationService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.authenticationService.checkLoggedInStatus().subscribe(
      loggedIn => {
        if (loggedIn) {
          this.router.navigate(['/']);
        }
      }
    );
    this.route.paramMap.subscribe(params => {
      this.mailAddress = params.get('email');
    });
  }
  onSubmit() {
    this.authenticationService.logIn(this.mailAddress, this.password).subscribe(success => {
      this.valid = success;
      if (success) {
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
}
