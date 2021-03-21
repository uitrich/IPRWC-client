import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../services/http.service';
import {environment} from '../../environments/environment';
import {Product} from '../model/Product.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  max = 9;
  pageNumber = 1;
  @Input() length: number;
  @Output() messageEvent = new EventEmitter<number>();
  constructor() { }

  clickPage(page: number) {
    this.pageNumber = page;
    this.messageEvent.emit(this.pageNumber);
    if (this.max >= length - 5) { return; }
    if (this.max <= 4) { return; }
    this.max = this.pageNumber + 5;
  }
}
