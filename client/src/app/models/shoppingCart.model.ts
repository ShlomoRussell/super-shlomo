import { Items } from "./item.model";

export class ShoppingCartItem {
  constructor(
    public itemId?: string,
    public quantity?: number,
    public totalPrice?: number|string
  ) {}
}
export class ShoppingCart {
  constructor(
    public items: ShoppingCartItem[],
    public customerId?: string,
    public dateCreated?: Date
  ) {}
}
export interface CartItemMapped extends Items, ShoppingCartItem {}
