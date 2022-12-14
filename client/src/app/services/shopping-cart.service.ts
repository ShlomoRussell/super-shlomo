import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CartItemMapped,
  ShoppingCart,
  ShoppingCartItem,
} from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private httpClient: HttpClient) { }
  private cart = new BehaviorSubject<ShoppingCart>(new ShoppingCart([]));
  public getCart = this.cart.asObservable();
  public setCart(newCart: ShoppingCart) {
    return this.cart.next(newCart);
  }
  public setCartItems(
    newItem: ShoppingCartItem | null,
    cartItems?: ShoppingCartItem[]
  ) {
    //removing an item from the cartItem array
    if (cartItems) {
      return this.cart.next({
        ...this.cart.value,
        items: [...cartItems],
      });
    }
    //adding an item to the cartItem array
    return this.cart.next({
      ...this.cart.value,
      items: [...this.cart.value.items, newItem!],
    });
  }
  private cartItemsMapped = new BehaviorSubject<CartItemMapped[]>([]);

  public getCartItemsMapped = this.cartItemsMapped.asObservable();

  public setCartItemsMapped(cartItems: CartItemMapped[]) {
    if (cartItems.length === 0) {
      return this.cartItemsMapped.next(cartItems);
    }
    return this.cartItemsMapped.next(cartItems);
  }

  public getShoppingCart(): Observable<ShoppingCart> {
    return this.httpClient.get<ShoppingCart>(
      `${environment.baseUrl}/api/shoppingCart`
    );
  }

  public addToCart(item: ShoppingCartItem, cartId: string): Observable<ShoppingCartItem> {
    return this.httpClient.put<ShoppingCartItem>(
      `${environment.baseUrl}/api/shoppingCart/addToCart`,
      { item, cartId }
    );
  }

  public deleteOneItemFromCart(itemId: string, cartId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${environment.baseUrl}/api/shoppingCart/oneItem`,
      {
        body: {
          itemId,
          cartId
        },
      }
    );
  }

  public deleteAllOfItemTypeFromCart(itemId: string, cartId: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${environment.baseUrl}/api/shoppingCart/allOfItemType`,
      {
        body: {
          itemId,
          cartId
        },
      }
    );
  }

  public newCart(): Observable<ShoppingCart> {
    return this.httpClient.get<ShoppingCart>(`${environment.baseUrl}/api/shoppingCart/newCart`)
  }

  public deleteCart(): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${environment.baseUrl}/api/shoppingCart`
    );
  }
}
