import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/Product.model';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  @Input() product: Product = null;
  @Input() image;
  @Input()thumbnail: boolean;
  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    if (this.thumbnail === undefined) { this.thumbnail = false; }
    this.createImageFromBlob(this.base64converter(this.image.split(',')[1]));
  }

  addToShoppingCart(id: number) {
    this.httpService.makePostRequest( 'api/shoppingcart/' + id, '').subscribe(data => {
      this.router.navigate(['shoppingcart']);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.image = reader.result;
      console.log('image found');
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  truncate(input: string) {
    const res: string[] = input.split(' ');
    const result = res[0] + ' ' + res[1] + ' ' + res[2] + ' ' + res[3];
    return result;
  }

  base64converter(input: string) {
    const bChar = atob(input);
    const bNum = new Array(bChar.length);
    for (let i = 0; i < bChar.length; i++) {
      bNum[i] = bChar.charCodeAt(i);
    }
    const bArray = new Uint8Array(bNum);
    return new Blob([bArray], {type: 'image/jpeg'});
  }
}
