import mongoose from "mongoose";
import user from "../models/user.js";
import express from "express";
import bcrypt from "bcrypt";
import _ from "lodash";
import Joi from "joi";

const register = express.Router();
const User = mongoose.model("users", user.userSchema);

register.post("/", async (req, res) => {
  try {
    const { error, value: userObject } = user.joiSchema.validate(req.body);
    if (error) return res.status(400).send(error);
    //"Invalid Data"

    let foundUser = await User.findOne({ email: userObject.email });
    if (foundUser) return res.status(400).send("Email Already registered!!!");

    // New user
    if (!userObject.name) userObject.name = userObject.email.split("@")[0];

    // Salting
    const salt = await bcrypt.genSalt(10);
    userObject.password = await bcrypt.hash(userObject.password, salt);

    const savedUser = await User.create(userObject);
    const token = savedUser.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .status(200)
      .send(_.pick(savedUser, ["name", "email"]));
    //"Sucessfully registered!!!"
  } catch (error) {
    res.status(400).send(error);
  }
});
export default register;
