export default class ItemsModel {
  /**
   * @param {object} item
   * @param {String} item.productName
   * @param {number} item.price
   * @param {String} item.picture
   * @param { string} item.category
   */
  constructor({ productName, price, picture, category }) {
    this.productName = productName;
    this.price = price;
    this.picture = picture;
    this.category = category;
  }
}
