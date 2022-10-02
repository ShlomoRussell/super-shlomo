import { Component, OnInit } from '@angular/core';
import {
  CartItemMapped,
  ShoppingCart,
} from 'src/app/models/shoppingCart.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  public cartItems!: CartItemMapped[];
  public subTotal!: string;
  public total!: string;
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.getCartItemsMapped.subscribe((res) => {
      this.cartItems = res;
      this.subTotal = this.cartItems.reduce(
        (prev, curr) => (Number(curr.totalPrice!) + Number(prev)).toFixed(2),
        '0'
      );
      this.total = (
        Number(this.subTotal) +
        Number(this.subTotal) * 0.17
      ).toFixed(2);
      this.shoppingCartService.getCart.subscribe(res=>console.log(res))
    });
  }
}
