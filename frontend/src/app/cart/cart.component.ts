import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart, ICartItem } from '../shared/models/cart';
import { CartService } from 'src/app/cart/cart.service';
import { IImage } from '../shared/models/image';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() image : IImage;
  cart$: Observable<ICart>;
  images: IImage[];
  image$:Observable<IImage[]>;

  constructor(private cartService: CartService,private shopService:ShopService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.image$ = this.shopService.getImages();
  }

  removeCartItem(item: ICartItem)
  {
    this.cartService.removeItemFromCart(item);
  }

  incrementItemQuantity(item: ICartItem)
  {
    this.cartService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: ICartItem)
  {
    this.cartService.decrementItemQuantity(item);
  }
}
