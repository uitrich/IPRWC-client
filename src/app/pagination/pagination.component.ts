import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../services/http.service';
import {environment} from '../../environments/environment';
import {Product} from '../model/Product.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  max = 9;
  pagenumber = 1;
  @Input() length: number;
  @Output() messageEvent = new EventEmitter<number>();
  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  clickPage(page: number) {
    this.pagenumber = page;
    this.messageEvent.emit(this.pagenumber);
    if (this.max >= length - 5) { return; }
    if (this.max <= 4) { return; }
    this.max = this.pagenumber + 5;
    console.log(length);
  }
}
