import mongoose from "mongoose";
import { getPrice, setPrice } from "./priceHelpers.js";

const { Schema, model } = mongoose;

const cartItemsSchema = new Schema({
  itemId: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, get: getPrice, set: setPrice, required: true },
});

const shoppingCartSchema = new Schema({
  customerId: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  items: [cartItemsSchema],
});

const shoppingCartModel = model("cart", shoppingCartSchema);
export async function deleteCart(customerId) {
  return shoppingCartModel.deleteOne({ customerId });
}

export async function findCart(customerId) {
  return shoppingCartModel.find({ customerId });
}

export async function createCart(newCart) {
  return shoppingCartModel.insertMany(newCart);
}
const checkIfItemExists = async (customerId, itemId) => {
  const [{ items }] = await shoppingCartModel
    .find({ customerId })
    .select({ items: 1, _id: 0 });
  return items.find((item) => item.itemId === itemId);
};

const updateOneItemQuantity = async (customerId, newItem) =>
  shoppingCartModel.updateOne(
    {
      customerId,
      "items.itemId": newItem.itemId,
    },
    {
      $inc: {
        "items.$.quantity": newItem.quantity,
        "items.$.totalPrice": newItem.totalPrice,
      },
    }
  );

export async function insertToCart(newItem, customerId) {
  const itemExists = await checkIfItemExists(customerId, newItem.itemId);
  if (itemExists) {
    return updateOneItemQuantity(customerId, newItem);
  }
  return shoppingCartModel.updateOne(
    { customerId },
    { $push: { items: newItem } }
  );
}

export async function deleteOneItem(itemId, customerId) {
  const { quantity, totalPrice } = await checkIfItemExists(customerId, itemId);

  if (quantity > 1) {
    return updateOneItemQuantity(customerId, {
      quantity: -1,
      totalPrice: -(totalPrice / quantity),
      itemId,
    });
  }
  return deleteAllOfOneItemType(itemId, customerId);
}

export async function deleteAllOfOneItemType(itemId, customerId) {
  return shoppingCartModel.updateOne(
    { customerId },
    {
      $pull: {
        items: { itemId },
      },
    }
  );
}
