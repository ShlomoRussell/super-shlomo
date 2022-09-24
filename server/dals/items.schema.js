import mongoose from "mongoose";
import { getPrice, setPrice } from "./priceHelpers.js";

const { Schema, model } = mongoose;

const itemsSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, get: getPrice, set: setPrice, required: true },
  picture: { type: String, required: true },
  category: { type: String, required: true },
});

const itemsModel = model("items", itemsSchema);

export async function findAllItems() {
  return itemsModel.find({});
}

export async function getCategories() {
  return (await itemsModel.find({}).select({ category: 1, _id: 0 })).map(
    (c) => c.category
  );
}

export async function insertItem(newItem) {
  return itemsModel.insertMany(newItem);
}
