import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { IImage } from '../../shared/models/image';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product: IProduct;
images: IImage[];
@Input() image : IImage;
quantity = 1;
  constructor(private shopService:ShopService,private activateRoute: ActivatedRoute,private bcService:BreadcrumbService, private cartService:CartService) {
    this.bcService.set('@productDetails','');
   }

  ngOnInit(): void {
    this.loadProduct();
    this.loadProductImage();
  }

  addItemToCart()
  {
    this.cartService.addItemToCart(this.product, this.quantity);
  }

  incrementQuantity()
  {
    this.quantity++;
  }

  decrementQuantity()
  {
    if(this.quantity > 1)
    {
      this.quantity--;
    }
  }

  loadProduct()
  {
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product =>{
      this.product = product;
      this.bcService.set('@productDetails',product.productName);
    },error => {
      console.log(error);
    });
  }

  loadProductImage()
  {
    this.shopService.getProductImages(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(images =>{
      this.images = images;
    },error => {
      console.log(error);
    });
  }

}
