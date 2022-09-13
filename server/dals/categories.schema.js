import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categoriesSchema = new Schema({
  categoryName: { type: String, required: true },
});

const categoriesModel = model("categories", categoriesSchema);

