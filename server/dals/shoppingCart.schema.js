import mongoose from "mongoose";
import { getPrice, setPrice } from "./priceHelpers";

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
