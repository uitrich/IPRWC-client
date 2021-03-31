import {Component, OnInit} from '@angular/core';
import {Company} from '../../model/Company.model';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.scss']
})
export class SearchCompanyComponent implements OnInit {
  companies: Company[];

  constructor(private readonly companyService: CompanyService, private readonly router: Router) { }

  ngOnInit() {
    this.companyService.getAll().subscribe(data => {
      this.companies = data as Company[];
    });
  }
  routeToCompany(id: number) {
    this.router.navigate(['/search'], { queryParams: { company: id, companySearch: true } });
  }
}
