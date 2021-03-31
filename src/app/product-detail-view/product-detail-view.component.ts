import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../model/Product.model';
import {ImageService} from '../services/image.service';
import {ShoppingCartService} from '../services/shoppingcart.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.scss']
})
export class ProductDetailViewComponent implements OnInit {
  productId: number;
  product: Product;
  image: string;
  loggedIn: boolean;
  constructor(private readonly route: ActivatedRoute,
              private readonly productService: ProductService,
              private readonly shoppingCartService: ShoppingCartService,
              private readonly authenticationService: AuthenticationService,
              private readonly router: Router,
              private readonly imageService: ImageService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // tslint:disable-next-line:radix
      this.productId = parseInt(params.get('id'));
      this.productService.get(this.productId).subscribe(data => {
        this.product = data as Product;
        if (this.productId === undefined || this.product === undefined) {
          this.router.navigate(['']);
        }
        this.image = this.product.image;
        this.imageService.createImageFromBlob(this.imageService.convertFromBase64(this.image.split(',')[1]));
      }, error => this.router.navigate(['/']));
    });
    this.loggedIn = this.authenticationService.accountId !== '';
    this.authenticationService.loggedInStatusChanged.subscribe((status) => {
      this.loggedIn = status;
    });
  }

  addToShoppingCart(id: number) {
     this.shoppingCartService.post(id).subscribe(data => {
        this.router.navigate(['shoppingcart']);
      });
  }
}
