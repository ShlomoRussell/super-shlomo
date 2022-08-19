import mongoose from "mongoose";
import { getPrice, setPrice } from "./priceHelpers";

const { Schema, model } = mongoose;

const itemsSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, get: getPrice, set: setPrice, required: true },
  picture: { type: String, required: true },
  category: { type: String, required: true },
});



const itemsModel = model("items", itemsSchema);
