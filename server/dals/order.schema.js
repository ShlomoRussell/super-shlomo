import mongoose from "mongoose";
import { getPrice, setPrice } from "./priceHelpers";
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  customerId: { type: String, required: true },
  cartId: { type: String, required: true },
  totalPrice: { type:Number, get: getPrice, set: setPrice, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  orderedDate: { type: Date, required: true },
  lastFourDigitsOfCC: { type: Number, required: true },
});

const orderModel = model("order", orderSchema);


