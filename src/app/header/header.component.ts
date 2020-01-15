import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  loggedInSub: Subscription;
  roleChangedSub: Subscription;
  admin = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loggedInSub = this.authenticationService.loggedInStatusChanged.subscribe((status) => {
      this.loggedIn = status;
    });

    this.roleChangedSub = this.authenticationService.roleChanged.subscribe((newRole) => {
      this.admin = newRole === 'Admin';
      console.log(newRole === 'Admin', newRole);
    });
  }
  onSubmit(event: any) {
    this.router.navigate(['/search'], { queryParams: { search: event.target.value } });
  }
}
