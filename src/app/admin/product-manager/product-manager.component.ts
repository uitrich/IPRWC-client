import { Component, OnInit } from '@angular/core';
import {Body_Location} from '../../model/Body_Location.model';
import {Category} from '../../model/Category.model';
import {Company} from '../../model/Company.model';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/Product.model';
import {tap} from 'rxjs/operators';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
  products: Product[];
  images: string[];
  companies: Company[];
  categories: Category[];
  bodyLocations: Body_Location[];

  selectedProduct: Product;

  search: string;
  constructor(private productService: ProductService, private httpService: HttpService) { }

  ngOnInit() {
    this.getAll(1);
  }
  getAll(page: number) {
    this.productService.getAll(page, '', '', '', '')
      .subscribe(
        data => {
          this.selectedProduct = data['data'][0] as Product;
          this.products = data['data'] as Product[];
          this.products.forEach((product: Product) => {
            this.images.push(product.image);
          });
        });
  }

  remove(id: number) {
    this.productService.delete(this.selectedProduct.id);
  }

  update() {
    this.productService.put(this.selectedProduct);
  }
}
