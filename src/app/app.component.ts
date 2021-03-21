import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {MDBModalService} from 'angular-bootstrap-md';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public router: Router, private authService: AuthenticationService, private readonly modalService: MDBModalService) {
  }

  ngOnInit() {
    this.authService.checkLoggedInStatus().subscribe();
    this.modalService.config.backdrop = 'static';
  }
}
