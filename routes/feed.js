import express from "express";
import _ from "lodash";
import mongoose from "mongoose";
import user from "../models/user.js";
const feed = express.Router();
const User = mongoose.model("users", user.userSchema);
feed.get("/", async (req, res) => {
  // console.log(req.query);
  try {
    const email = req.query.email;
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      res.send(foundUser);
    } else res.status(400);
  } catch (error) {
    console.log(error.message);
  }
});
export default feed;
