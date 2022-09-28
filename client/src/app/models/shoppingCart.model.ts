export class ShoppingCartItem {
  constructor(
    public id?: String,
    public quantity?: Number,
    public totalPrice?: Number
  ) {}
}
export class ShoppingCart {
  constructor(
    public items: ShoppingCartItem[],
    public customerId?: String,
    public dateCreated?: Date
  ) {}
}
