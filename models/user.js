import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  theme: {
    type: String,
    default: "light",
  },
  likes: {
    type: Array,
  },
  diet: {
    type: Array,
  },
});
const foodItem = Joi.object().keys({
  name: Joi.string(),
  calories: Joi.number(),
});
const diet = Joi.object().keys({
  earlyMorning: Joi.array().items(foodItem),
  midMorning: Joi.array().items(foodItem),
  breakfast: Joi.array().items(foodItem),
  lunch: Joi.array().items(foodItem),
  evening: Joi.array().items(foodItem),
  dinner: Joi.array().items(foodItem),
  postDinner: Joi.array().items(foodItem),
});
const dietObject = Joi.object().keys({
  date: Joi.date(),
  diet: diet,
});
const joiSchema = Joi.object({
  name: Joi.string().min(5).max(50),
  email: Joi.string().min(5).max(255).email().required(),
  password: Joi.string().min(5).max(255).required(),
  likes: Joi.array(),
  diet: Joi.array().items(dietObject),
  favouriteRecipes: Joi.array(),
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    "foodlamp"
  );
  return token;
};
export default {
  userSchema,
  joiSchema,
};
