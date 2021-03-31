import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

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
    this.route.queryParams.subscribe(params => {
      this.mailAddress = params.email;
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
