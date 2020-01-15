import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Company} from '../../model/Company.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.scss']
})
export class SearchCompanyComponent implements OnInit {
  companies: Company[];
  splitCompanies: Company[][];

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.httpService.makeGetRequest('api/company').subscribe(data => {
      this.companies = data as Company[];
    });
  }
  routeToCompany(id: number) {
    this.router.navigate(['/search'], { queryParams: { company: id, companySearch: true } });
  }
}
