import { Injectable } from '@angular/core';
import { ShoppingCart, ShoppingCartItem } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor() {}
  public cart: ShoppingCart = new ShoppingCart();
  public cartItems: ShoppingCartItem[]=[];
}
