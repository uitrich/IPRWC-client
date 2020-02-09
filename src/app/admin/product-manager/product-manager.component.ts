import { Component, OnInit } from '@angular/core';
import {Body_Location} from '../../model/Body_Location.model';
import {Account} from '../../model/Account.model';
import {Company} from '../../model/Company.model';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/Product.model';
import {tap} from 'rxjs/operators';
import {HttpService} from '../../services/http.service';
import {CompanyService} from '../../services/company.service';
import {CategoryService} from '../../services/category.service';
import {BodyLocationService} from '../../services/bodyLocation.service';
import {Category} from '../../model/Category.model';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
  loaded = false;
  products: Product[];
  images = [];
  companies: Company[];
  categories: Category[];
  bodyLocations: Body_Location[];

  newProduct: Product = new Product('', 0.00, new Body_Location(0, ''), new Category(0, ''), new Company(0, ''), 0, '');
  selectedProduct = new Product('', 0.00, new Body_Location(0, ''), new Category(0, ''), new Company(0, ''), 0, '');

  newProductName: string;
  oldImage: string;
  newImage: string;
  imageHasChanged: boolean;
  private message: any;
  constructor(private productService: ProductService,
              private httpService: HttpService,
              private companyService: CompanyService,
              private categoryService: CategoryService,
              private bodyLocationService: BodyLocationService) {
    this.newProduct = new Product('', 0.00, new Body_Location(0, ''), new Category(0, ''), new Company(0, ''), 0, '');
    this.selectedProduct = new Product('', 0.00, new Body_Location(0, ''), new Category(0, ''), new Company(0, ''), 0, '');
  }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.productService.getAllAdmin()
      .subscribe(
        data => {
          this.selectedProduct = data[0];
          this.products = data;
          this.products.forEach((product: Product) => {
            this.images.push(product.image);
          });
          this.companyService.getAll().subscribe(companies => {
            this.companies = companies;
            this.bodyLocationService.getAll().subscribe(body => {
              this.bodyLocations = body;
              this.categoryService.getAll().subscribe(categories => {
                this.categories = categories;
                this.loaded = true;
              });
            });
          });
        });

  }

  remove(id: number) {
    console.log(id);
    this.productService.delete(id).subscribe(data => {
      this.getAll();
    });
  }

  update() {
    this.productService.put(this.selectedProduct).subscribe(data => {console.log(data); });
  }

  onFileChangesNew(event: any) {
    const image: string = event[0]['base64'];
    this.oldImage = this.newProduct.image;
    this.newProduct.image = image;
    this.imageHasChanged = true;
  }

  onFileChanges(event: any) {
    const image: string = event[0]['base64'];
    this.oldImage = this.selectedProduct.image;
    this.selectedProduct.image = image;
    this.imageHasChanged = true;
  }
  onUpdateClose() {
    this.selectedProduct.image = this.oldImage;
  }
  onNewClose() {
    this.newProduct.image = null;
  }

  post() {
    this.productService.post(this.newProduct).subscribe(data => { console.log(data); this.getAll(); });
  }
}
