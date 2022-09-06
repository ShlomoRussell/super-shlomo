import express from "express";
import { config } from "dotenv";
import jwtMiddleware from './middlewares/jwtMiddleware.js'
import authRoute from "./controllers/auth.ctrl.js";
import { connectMongo } from "./dals/index.js";


config();
const app = express();
const PORT = process.env.PORT;



app.use(express.json())
app.use(express.static('public'))
app.use('/images',express.static('uploads'))
app.use("/auth", authRoute);
app.use('/api/', jwtMiddleware)



connectMongo().catch(err=>console.log(err))
app.listen(PORT, () => console.log(`served via port ${PORT}`));
