import { Component, Input, OnInit } from '@angular/core';
import { IImage } from 'src/app/shared/models/image';

@Component({
  selector: 'app-product-image-item',
  templateUrl: './product-image-item.component.html',
  styleUrls: ['./product-image-item.component.scss']
})
export class ProductImageItemComponent implements OnInit {
  @Input() image : IImage

  constructor() { }

  ngOnInit(): void {
  }

}
