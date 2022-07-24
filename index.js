import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import feed from "./routes/feed.js";
import login from "./routes/login.js";
import register from "./routes/register.js";
import like from "./routes/like.js";
import me from "./routes/me.js";
import diet from "./routes/diet.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
console.log(process.env.DB);
mongoose.connect(
  process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected")
);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use("/feed", feed);
app.use("/login", login);
app.use("/register", register);
app.use("/diet", diet);
app.use("/like", like);
app.use("/me", me);
//testing
import user from "./models/user.js";
const User = mongoose.model("users", user.userSchema);
app.get("/", async (req, res) => {
  console.log("working logs");
  const found=await User.find();
  console.log(found);
  return res.sendStatus(200);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
