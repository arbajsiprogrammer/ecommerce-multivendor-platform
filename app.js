import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./util/db.util.js";
import { db } from "./util/db.util.js";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

connectDB()
  .then((res) => {
    console.log("DB connected", res);
  })
  .catch((error) => console.log(error));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
