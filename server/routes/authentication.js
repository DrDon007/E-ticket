import express from "express";
import User from "../models/user";
import passport, { use } from "passport";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWTSecret } from "../config/jwtConfig";
var router = express.Router();
const BCRYPT_SALTS_ROUNDS = 12;

/**
 * GET To fetch users
 */

router.get("/", async (req, res, next) => {
  console.log(req);
});

/* POST registers new user. */
router.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, BCRYPT_SALTS_ROUNDS);
    const user = new User({ username, passwordHash, email });
    await user.save();
    res.status(200).send({ status: true, message: "user created", user });
  } catch (err) {
    console.log("errr", err);
    res.status(400).send({ status: false, message: "user not created" });
  }
});

/* POST login new user. */
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.findOne({
      username: username,
    }).exec();
    console.log(user);
    if (!user) {
      return res.status(400).send({ status: false, message: "user not found" });
    }
    const comparePassword = await bcrypt.compare(password, user.passwordHash);
    if (!comparePassword) {
      res.status(200).send({ status: true, message: "Ooops! wrong password" });
    }
    const jwt_token = jwt.sign({ id: user.id }, JWTSecret);
    res.status(200).send({
      status: true,
      data: {
        user,
        jwt_token,
      },
    });
  } catch (err) {
    console.log("errr", err);
    res.status(400).send({ status: false, message: "user not created" });
  }
});

export default router;
