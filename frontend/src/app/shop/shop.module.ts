import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductImageItemComponent } from './product-image-item/product-image-item.component';
import { CarouselComponent } from '../core/carousel/carousel.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';



@NgModule({
  declarations: [ShopComponent, ProductItemComponent, ProductImageItemComponent, CarouselComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    ShopRoutingModule
    ]
  })
export class ShopModule { }
