import {Component, Inject, OnInit} from '@angular/core';
import {BodyLocation} from '../../model/BodyLocation.model';
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
import {element} from 'protractor';
import {MDBModalRef} from 'angular-bootstrap-md';

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
  bodyLocations: BodyLocation[];

  newProduct: Product = new Product('', 0.00, new BodyLocation(0, ''), new Category(0, ''), new Company(0, ''), 0, '');
  selectedProduct = new Product('', 0.00, new BodyLocation(0, ''), new Category(0, ''), new Company(0, ''), 0, '');

  newProductName: string;
  oldImage: string;
  newImage: string;
  imageHasChanged: boolean;
  private message: any;
  constructor(private readonly productService: ProductService,
              private readonly companyService: CompanyService,
              private readonly categoryService: CategoryService,
              private readonly bodyLocationService: BodyLocationService) {
    this.newProduct = new Product('', 0.00, new BodyLocation(0, ''), new Category(0, ''), new Company(0, ''), 0, '');
    this.selectedProduct = new Product('', 0.00, new BodyLocation(0, ''), new Category(0, ''), new Company(0, ''), 0, '');
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
      document.getElementById(id.toString()).remove();
    });
  }

  update(edit: MDBModalRef) {
    this.productService.put(this.selectedProduct).subscribe(data => edit.hide());
  }

  onFileChangesNew(event: any) {
    const image: string = event[0].base64;
    this.oldImage = this.newProduct.image;
    this.newProduct.image = image;
    this.imageHasChanged = true;
  }

  onFileChanges(event: any) {
    const image: string = event[0].base64;
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

  post(modal: MDBModalRef) {
    this.productService.post(this.newProduct).subscribe(data => { debugger; this.products.push(data); modal.hide(); });
  }
}
