import express from "express";
import _ from "lodash";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import user from "../models/user.js";
const me = express.Router();
const User = mongoose.model("users", user.userSchema);
me.post("/theme", async (req, res) => {
  try {
    const { email, theme } = req.body;
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      foundUser.theme = theme;
      await User.create(foundUser);
      res.status(200).send("Theme Changed");
    } else res.status(400);
  } catch (ex) {
    console.log(ex.message);
  }
});
me.post("/profile", async (req, res) => {
  // console.log(req.body);
  try {
    const { email, name, oldPassword, newPassword, newEmail } = req.body;
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      if (name !== "") foundUser.name = name;
      if (newEmail !== "") foundUser.email = newEmail;
      //password
      const validPassword = await bcrypt.compare(
        oldPassword,
        foundUser.password
      );
      if (validPassword && newPassword !== "") {
        const salt = await bcrypt.genSalt(10);
        foundUser.password = await bcrypt.hash(newPassword, salt);
      }

      await User.create(foundUser);
      res.status(200).send("User Updated");
    } else res.status(400);
  } catch (ex) {
    console.log(ex.message);
  }
});
export default me;
