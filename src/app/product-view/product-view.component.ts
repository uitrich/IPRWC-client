import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/Product.model';
import {environment} from '../../environments/environment';
import {ImageService} from '../services/image.service';
import {ShoppingCartService} from '../services/shoppingcart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  @Input() product: Product = null;
  @Input() image: string;
  @Input() thumbnail: boolean;
  @Input() shoppingCartActive = true;
  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly imageService: ImageService,
              private readonly shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    if (this.thumbnail === undefined) { this.thumbnail = false; }
    this.imageService.createImageFromBlob(this.imageService.convertFromBase64(this.image.split(',')[1]));
  }

  addToShoppingCart(id: number) {
    this.shoppingCartService.post( id).subscribe(data => {
      this.router.navigate(['shoppingcart']);
    });
  }
}
