import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.scss']
})
export class CategoryHeaderComponent {

  constructor(private router: Router) { }

  category(id: number) {
    this.router.navigate(['/search'], { queryParams: { category: id } });
  }
  bodyLocation(id: number) {
    this.router.navigate(['/search'], { queryParams: { bodylocation: id } });
  }
  company(id: number) {
    this.router.navigate(['/search'], { queryParams: { company: id } });
  }

  sendToCompany() {
    this.router.navigate(['/search'], {queryParams: { companySearch: true}});
  }
}
