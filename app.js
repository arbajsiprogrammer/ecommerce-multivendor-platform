import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./util/db.util.js";
import { db } from "./util/db.util.js";
import authRoute from "./route/auth.route.js";

const app = express();
app.use(express.json());
// middleware
app.use("/api/v1", authRoute);

app.get("/", (req, res) => {
  res.send("Server is running");
});

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
