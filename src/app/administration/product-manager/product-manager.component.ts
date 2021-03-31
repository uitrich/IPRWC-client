import {Component, OnInit} from '@angular/core';
import {BodyLocation} from '../../model/BodyLocation.model';
import {Company} from '../../model/Company.model';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/Product.model';
import {CompanyService} from '../../services/company.service';
import {CategoryService} from '../../services/category.service';
import {BodyLocationService} from '../../services/bodyLocation.service';
import {Category} from '../../model/Category.model';
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

  oldProduct: Product = new Product('','','','','',0,'');
  newImage: string;
  imageHasChanged: boolean;

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
    this.productService.delete(id).subscribe(data => {
      document.getElementById(id.toString()).remove();
    });
  }

  update(edit: MDBModalRef) {
    this.productService.put(this.selectedProduct).subscribe(data => edit.hide());
  }

  onFileChangesNew(event: any) {
    const image: string = event[0].base64;
    this.newProduct.image = image;
    this.imageHasChanged = true;
  }

  onFileChanges(event: any) {
    const image: string = event[0].base64;
    this.oldProduct.image = this.selectedProduct.image;
    this.selectedProduct.image = image;
    this.imageHasChanged = true;
  }
  onUpdateClose() {
    this.productService.get(this.selectedProduct.id).subscribe(data => {
      this.selectedProduct.name = data.name;
      this.selectedProduct.bodyLocation = data.bodyLocation;
      this.selectedProduct.company = data.company;
      this.selectedProduct.category = data.category;
      this.selectedProduct.price = data.price;
      this.selectedProduct.image = data.image;
    });
  }
  onUpdateOpen() {
  }

  post(modal: MDBModalRef) {
    this.productService.post(this.newProduct).subscribe(data => { debugger; this.products.push(data); modal.hide(); });
  }
}
