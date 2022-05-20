import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductImageItemComponent } from './product-image-item/product-image-item.component';
import { CarouselComponent } from '../core/carousel/carousel.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ShopComponent, ProductItemComponent, ProductImageItemComponent, CarouselComponent],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule
  ],
  exports : [ShopComponent]
})
export class ShopModule { }
