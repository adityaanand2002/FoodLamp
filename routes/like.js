import express from "express";
import mongoose from "mongoose";
import user from "../models/user.js";
import _ from "lodash";
import Joi from "joi";
const like = express.Router();
const User = mongoose.model("users", user.userSchema);

like.post("/", async (req, res) => {
  try {
    const { email: reqEmail, link } = req.body;
    const {
      value: { email },
      error,
    } = Joi.object({
      email: Joi.string().min(5).max(255).email().required(),
    }).validate({ email: reqEmail });

    //Invalid form of data
    if (error) return res.status(400).send(error.details[0].message);
    if (!link || link.length === 0) {
      return res.status(400).send("No link provided!");
    }
    let foundUser = await User.findOne({ email });
    if (!foundUser.likes.includes(JSON.stringify(link))) {
      foundUser.likes.push(JSON.stringify(link));
      await User.create(foundUser);
      res.send("Liked");
    } else {
      const index = foundUser.likes.indexOf(JSON.stringify(link));
      if (index > -1) {
        foundUser.likes.splice(index, 1);
      }
      await User.create(foundUser);
      res.send("Unliked");
    }
  } catch (error) {
    console.log(error.message);
  }
});

export default like;
