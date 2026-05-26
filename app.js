import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectDB } from "./util/db.util.js";
import { db } from "./util/db.util.js";
import authRoute from "./route/auth.route.js";
import productRoute from "./route/product.route.js";
import adminRouter from "./route/admin.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// middleware
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send("Server is running");
});

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
