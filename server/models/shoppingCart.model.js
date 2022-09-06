class ShoppingCartItems {
  /**
   * @param { object} item
   * @param {String} item.id
   * @param { Number}item.quantity
   * @param {Number} item.totalPrice
   */
  constructor({ id, quantity, totalPrice }) {
    this.id = id;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }
}

export default class ShoppingCartModel {
  /**
   * @param {object} cart
   * @param {String} cart.customerId
   * @param {Date} cart.dateCreated
   * @param {ShoppingCartItems[]} cart.items
   */
  constructor({ customerId, dateCreated, items }) {
    this.customerId = customerId;
    this.dateCreated = dateCreated;
    this.items = items.map((i) => new ShoppingCartItems(i));
  }
}
