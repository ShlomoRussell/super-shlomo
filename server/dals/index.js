import mongoose from "mongoose";
import { userModel } from "./users.schema.js";

export async function connectMongo() {
  await mongoose.connect("mongodb://localhost:27017/super-shlomo");
}


