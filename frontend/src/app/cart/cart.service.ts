import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Cart, ICart, ICartItem, ICartTotals } from '../shared/models/cart';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  private cartSource = new BehaviorSubject<ICart>(null);
  cart$ = this.cartSource.asObservable();
  private cartTotalSource = new BehaviorSubject<ICartTotals>(null);
  carTotal$ = this.cartTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getCart(id: string)
  {
    return this.http.get(this.baseUrl + 'cart?id='+id).pipe(
      map((cart: ICart) =>{
        this.cartSource.next(cart);
        this.calculateTotals();
      })
    );
  }

  incrementItemQuantity(item: ICartItem)
  {
    const cart = this.getCurrentCartValue();
    const foundItemIndex = cart.items.findIndex(x=>x.id === item.id);
    cart.items[foundItemIndex].quantity++;
    this.setCart(cart);
  }

  decrementItemQuantity(item: ICartItem)
  {
    const cart = this.getCurrentCartValue();
    const foundItemIndex = cart.items.findIndex(x=>x.id === item.id);
    if(cart.items[foundItemIndex].quantity > 1)
    {
      cart.items[foundItemIndex].quantity--;
      this.setCart(cart);
    }else{
      this.removeItemFromCart(item);
    }
    cart.items[foundItemIndex].quantity++;
  }

  removeItemFromCart(item: ICartItem) {
    const cart = this.getCurrentCartValue();
    if(cart.items.some(x => x.id === item.id))
    {
      cart.items = cart.items.filter(i => i.id !== item.id);
      if(cart.items.length>0)
      {
        this.setCart(cart);
      }else{
        this.deleteCart(cart);
      }
    }
  }

  deleteCart(cart: ICart) {
    return this.http.delete(this.baseUrl + 'cart?id=' + cart.id).subscribe(() => {
      this.cartSource.next(null);
      this.cartTotalSource.next(null);
      localStorage.removeItem('cart_id');
    }, error => {
      console.log(error);
    });
  }

  setCart(cart: ICart)
  {
    return this.http.post(this.baseUrl + 'cart',cart).subscribe((response: ICart) =>{
      this.cartSource.next(response);
      this.calculateTotals();
    }, error =>{
      console.log(error);
    });
  }

  getCurrentCartValue(){
    return this.cartSource.value;
  }

  addItemToCart(item: IProduct, quantity=1)
  {
    const itemToAdd: ICartItem = this.mapProductItemToCartItem(item, quantity);
    const cart = this.getCurrentCartValue() ?? this.createCart();
    cart.items = this.addOrUpdateItem(cart.items, itemToAdd, quantity);
    this.setCart(cart);
  }

  private addOrUpdateItem(items: ICartItem[], itemToAdd: ICartItem, quantity: number): ICartItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1)
    {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }else{
      items[index].quantity += quantity;
    }
    return items;
  }
  private calculateTotals()
  {
    const cart = this.getCurrentCartValue();
    const shipping = 0;
    const subtotal = cart.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.cartTotalSource.next({shipping, total, subtotal});
  }

  private createCart(): ICart {
    const cart = new Cart();
    localStorage.setItem('cart_id',cart.id);
    return cart;
  }

  private mapProductItemToCartItem(item: IProduct, quantity: number): ICartItem {
    return {
      id: item.id,
      productName : item.productName,
      productDescription: item.productDescription,
      productSpecification:item.specification,
      price: item.price,
      productId: item.id,
      quantity,
      brand: item.brand,
      subCategory: item.subCategory
    };
  }
}
