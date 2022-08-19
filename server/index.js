import express from "express";
import { config } from "dotenv";
import authRoute from "./controllers/auth.ctrl.js";
import { connectMongo } from "./dals/index.js";
config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json())
app.use("/auth", authRoute);
connectMongo().catch(err=>console.log(err))
app.listen(PORT, () => console.log(`served via port ${PORT}`));
