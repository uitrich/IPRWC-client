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
  products: any[][];
  length: number;
  search: string;
  constructor(private httpService: HttpService, private route: ActivatedRoute) {
  }
  message: number;

  receiveMessage($event) {
    this.message = $event;
    this.getProducts(this.message);
  }

  ngOnInit() {
    this.search = this.route.snapshot.params.query;
    this.getProducts(1);
  }
  getProducts(page: number) {
    this.httpService.makeGetRequest('api/product?page=' + page + '&search=' + this.search).subscribe(data => {
        const unordered = data['data'] as Product[];
        const result = [];
        for (let i = 0; i < unordered.length / 3; i++) {
          const orderedChunk: Product [] = [
            unordered[i],
            unordered[i + 1],
            unordered[i + 2]
          ];
          result.push(orderedChunk);
        }
        this.products = result;
        this.length = unordered.length;
      }
    );
  }

}
