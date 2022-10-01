import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {
  CartItemMapped,
  ShoppingCart,
  ShoppingCartItem,
} from 'src/app/models/shoppingCart.model';
import { ItemsService } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  public cart!: ShoppingCart;
  public cartItems: CartItemMapped[] = [];
  public total = '00.00';
  constructor(
    private shoppingCartService: ShoppingCartService,
    private itemsService: ItemsService,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.itemsService.get_items.subscribe((res) => {
      if (this.cart && this.cart.items.length > 0) {
        this.shoppingCartService.setCartItemsMapped(
          res
            .filter(
              (item) =>
                item.id ===
                this.cart.items.find((_item) => _item.itemId === item.id)
                  ?.itemId
            )
            .reduce(
              (newArr: CartItemMapped[], curr) => [
                ...newArr,
                {
                  ...this.cart.items.find((_item) => _item.itemId === curr.id),
                  ...curr,
                },
              ],
              []
            )
        );
      }
    });
    this.shoppingCartService
      .getShoppingCart()
      .subscribe((res) => (this.cart = res));
    this.shoppingCartService.getCartItemsMapped.subscribe((res) => {
      this.cartItems = res;
      this.total = res.reduce(
        (prev, curr) => (Number(curr.totalPrice!) + Number(prev)).toFixed(2),
        '0'
      );
    });
  }

  public addOneItem(item: ShoppingCartItem) {
    this.shoppingCartService.addToCart(item).subscribe((res) => {
      const index = this.cartItems.findIndex((item) => item.id == res.itemId);
      this.shoppingCartService.setCartItemsMapped(
        this.cartItems.map((item, i) => {
          if (i === index) {
            let { quantity, totalPrice } = item;
            return {
              ...item,
              ...this.cartItems[index],
              totalPrice: (
                Number(totalPrice!) +
                Number(totalPrice!) / quantity!
              ).toFixed(2),
              quantity: quantity! + 1,
            };
          }
          return item;
        })
      );
    });
  }
  public subtractOneItem(item: ShoppingCartItem) {
    if (item.quantity === 1) {
      return this.deleteAllOfItemType(item.itemId!);
    }
    this.shoppingCartService
      .deleteOneItemFromCart(item.itemId!)
      .subscribe((res) => {
        if (res) {
          const index = this.cartItems.findIndex(
            (_item) => _item.id == item.itemId
          );

          this.shoppingCartService.setCartItemsMapped(
            this.cartItems.map((item, i) => {
              if (i === index) {
                let { quantity, totalPrice, price } = item;
                return {
                  ...item,
                  ...this.cartItems[index],
                  totalPrice: (Number(totalPrice!) - price!).toFixed(2),
                  quantity: quantity! - 1,
                };
              }
              return item;
            })
          );
        }
      });
  }

  public deleteAllOfItemType(itemId: string) {
    this.shoppingCartService
      .deleteAllOfItemTypeFromCart(itemId)
      .subscribe((res) => {
        if (res) {
          this.shoppingCartService.setCartItemsMapped(
            this.cartItems.filter((item) => item.itemId !== itemId)
          );
        }
      });
  }

  public openScroll(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { scroll: true });
  }
}
