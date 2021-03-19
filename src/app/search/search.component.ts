import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../model/Product.model';
import {ProductService} from '../services/product.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products: any[];
  images: string[] = [];
  length: number;
  search: string;
  category: string;
  bodyLocation: string;
  company: string;
  loaded = false;
  message: number;
  headerValue: number | string;
  searchCompany = false;
  constructor(private readonly httpService: HttpService, private readonly route: ActivatedRoute, private productService: ProductService) {
  }

  receiveMessage($event) {
    this.message = $event;
    this.getProducts(this.message);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.bodyLocation = params['bodylocation'];
      this.company = params['company'];
      this.search = params["search"];
      this.searchCompany = params["companySearch"];
      this.getProducts(1);
    });
  }
  getProducts(page: number) {
    this.images = [];
    this.productService.search(page, this.search, this.category, this.company, this.bodyLocation).subscribe(data => {
        const unordered = data['data'] as Product[];
        const firstProduct = unordered[0];
        this.length = data['totalCount'];
        unordered.forEach((product: Product) => {
          this.images.push(product.image);
        });
        this.headerValue = this.search;
        if (this.category !== undefined) { this.headerValue = 'Category: ' + firstProduct.category.name; this.searchCompany = false; }
        if (this.company !== undefined) { this.headerValue = 'Company: ' + firstProduct.company.name; this.searchCompany = true; }
        if (this.bodyLocation !== undefined) {
          this.headerValue = 'Body Location: ' + firstProduct.bodyLocation.name; this.searchCompany = false;
        }
        this.products = unordered;
        this.loaded = true;
      }
    );
  }
}
