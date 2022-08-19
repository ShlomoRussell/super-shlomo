import { Router } from "express";
import { hash as _hash, compare } from "bcrypt";
import { config } from "dotenv";
import { getUserByUsernameOrEmail ,addUser} from "../bls/auth.bl.js";
import jwt from "jsonwebtoken";
const authRoute = Router();
config()
const saltRounds = 10;

authRoute.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await getUserByUsernameOrEmail({ username, email });
    if (user === undefined)
      throw new Error(`${username ? "username" : "email"} not found!`);

    const result = await compare(password, user.password);
    console.log(user);
    if (!result) return res.status(404).send("Incorrect password!");

    const token = jwt.sign(
      { username: req.body.username, id: user._id },
      process.env.SECRET_KEY
    );
    delete user.password;
    res.status(201).json({...user,token});
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
});

authRoute.post("/register", async (req, res) => {
  const hash = await _hash(req.body.password, saltRounds);
  try {
    const newUser = await addUser({
      ...req.body,
      password: hash,
    });

    if (newUser) {
      const token = jwt.sign(
        { username: newUser.username, id: newUser.id },
        process.env.SECRET_KEY
      );
      delete newUser.password;
      res.status(201).json({ token, ...newUser });
    }
  } catch (error) {
    if (error.message.split(" ")[1] === "Duplicate") {
      return res
        .status(409)
        .send("Username already exist! Please try a different one!");
    }
    console.log(error.message);
    return res.sendStatus(500);
  }
});

export default authRoute;
