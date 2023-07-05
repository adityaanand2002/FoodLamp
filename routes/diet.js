import express from "express";
import _ from "lodash";
import mongoose from "mongoose";
import user from "../models/user.js";
const diet = express.Router();
const User = mongoose.model("users", user.userSchema);
import pkg from "lodash";
const { isUndefined } = pkg;
diet.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { email, diet } = req.body;
    console.log(diet);
    if (email == null || isUndefined(diet))
      return res.status(400).send("Diet not provided");
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      console.log(foundUser.diet);
      foundUser.diet.push(diet);
      foundUser.diet.sort(function (a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      await User.create(foundUser);
      res.send("Diet Saved");
    } else res.status(400);
  } catch (error) {
    console.log(error.message);
  }
});
export default diet;
