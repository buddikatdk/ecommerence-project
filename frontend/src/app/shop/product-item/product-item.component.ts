import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { IImage } from 'src/app/shared/models/image';
import { IProduct } from 'src/app/shared/models/product';
import { ProductItemService } from 'src/app/shop/product-item/product-item.service';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
@Input() product: IProduct
images: IImage[];
  constructor(private productItemService: ProductItemService,private cartService: CartService) { }

  ngOnInit(): void {
this.getImages();
  }

  getImages()
  {
    this.productItemService.getImages().subscribe(response => {
      this.images = response;
    }, error => {
      console.log(error);
    });
  }

  addItemToCart()
  {
    this.cartService.addItemToCart(this.product);
  }
}
