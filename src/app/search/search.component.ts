import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../model/Product.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products: any[];
  images = [];
  length: number;
  search: string;
  category: number;
  body_location: number;
  company: number;
  loaded = false;
  constructor(private httpService: HttpService, private route: ActivatedRoute) {
  }
  message: number;
  headervalue: number | string;
  searchCompany = false;

  receiveMessage($event) {
    this.message = $event;
    this.getProducts(this.message);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.body_location = params['bodylocation'];
      this.company = params['company'];
      this.search = params["search"];
      this.searchCompany = params["companySearch"];
      this.getProducts(1);
    });
  }
  populateImages(data: Object) {

  }
  getProducts(page: number) {
    this.images = [];
    const categoryString = this.category !== undefined ? '&category=' + this.category : '';
    const companyString = this.company !== undefined ? '&company=' + this.company : '';
    const bodyLocationString = this.body_location !== undefined ? '&body_location=' + this.body_location : '';
    const searchString = this.search !== undefined && this.search !== '' ? '&search=' + this.search : '';
    this.httpService.makeGetRequest('api/product?page=' + page +
      searchString + categoryString + companyString + bodyLocationString).subscribe(data => {
        const unordered = data['data'] as Product[];
        const firstProduct = unordered[0];
        this.length = data['totalCount'];
        unordered.forEach((product: Product) => {
          this.images.push(product.image);
        });
        this.headervalue = this.search;
        if (this.category !== undefined) { this.headervalue = 'Category: ' + firstProduct.category.name; this.searchCompany = false; }
        if (this.company !== undefined) { this.headervalue = 'Company: ' + firstProduct.company.name; this.searchCompany = true; }
        if (this.body_location !== undefined) {
          this.headervalue = 'Body Location: ' + firstProduct.body_location.name; this.searchCompany = false;
        }
        this.products = unordered;
        this.loaded = true;
      }
    );
  }
}
