export class ShoppingCartItems {
  /**
   * @param {object} item
   * @param {String} item.itemId
   * @param {Number} item.quantity
   * @param {Number} item.totalPrice
   */
  constructor({ itemId, quantity, totalPrice }) {
    this.itemId = itemId;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }
}

export class ShoppingCartModel {
  /**
   * @param {object} cart
   * @param {String} cart.customerId
   * @param {Date} cart.dateCreated
   * @param {ShoppingCartItems[]} cart.items
   */
  constructor({ customerId, dateCreated, items }) {
    this.customerId = customerId;
    this.dateCreated = dateCreated;
    this.items = items.map((item) => new ShoppingCartItems(item));
  }
}
