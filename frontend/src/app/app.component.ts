import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DealsNow.LK';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const cartId = localStorage.getItem('cart_id');
    if(cartId)
    {
      this.cartService.getCart(cartId).subscribe(() =>
      {
        console.log('initilized cart');
      }, error =>{
        console.log(error);
      });
    }
  }
}
