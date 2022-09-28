import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCart, ShoppingCartItem } from '../models/shoppingCart.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private httpClient: HttpClient) {}
  private cart = new BehaviorSubject<ShoppingCart>(new ShoppingCart([]));
  public getCart = this.cart.asObservable();
  public setCart(newCart: ShoppingCart) {
    return this.cart.next(newCart);
  }
  public setCartItems(newItems: ShoppingCartItem[]) {
    return this.cart.next({
      ...this.cart.value,
      items: [...this.cart.value.items, ...newItems],
    });
  }

  public getShoppingCart(): Observable<ShoppingCart> {
    return this.httpClient.get<ShoppingCart>('/api/shoppingCart');
  }

  public createCart(): Observable<ShoppingCart> {
    return this.httpClient.post<ShoppingCart>('/api/shoppingCart', {});
  }

  public addToCart(item: ShoppingCartItem): Observable<ShoppingCartItem> {
    return this.httpClient.post<ShoppingCartItem>(
      '/api/shoppingCart/addToCart',
      item
    );
  }

  public deleteOneItemFromCart(itemId: String): Observable<boolean> {
    return this.httpClient.delete<boolean>('/api/shoppingCart/oneItem');
  }

  public deleteAllOfItemTypeFromCart(itemId: String): Observable<boolean> {
    return this.httpClient.delete<boolean>('/api/shoppingCart/allOfItemType');
  }
}
