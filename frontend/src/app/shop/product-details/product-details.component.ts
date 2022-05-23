import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { IImage } from '../../shared/models/image';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product: IProduct;
images: IImage[];
@Input() image : IImage;
  constructor(private shopService:ShopService,private activateRoute: ActivatedRoute,private bcService:BreadcrumbService) {
    this.bcService.set('@productDetails','');
   }

  ngOnInit(): void {
    this.loadProduct();
    this.loadProductImage();
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
