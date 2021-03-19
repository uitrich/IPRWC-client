import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Product} from '../model/Product.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  products: any[];
  length: number;

  constructor(private readonly httpService: HttpService, private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.httpService.makeGetRequest('api/product/top/' + 3).subscribe(data => {
        this.products = data as Product[];
      }
    );
  }
}
