import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectDB } from "./util/db.util.js";
import { db } from "./util/db.util.js";
import authRoute from "./route/auth.route.js";
import adminRouter from "./route/admin.route.js";
import vendorRouter from "./route/vendor.route.js";
import customerRouter from "./route/customer.route.js";
import cartRouter from "./route/cart.route.js";
import addressRouter from "./route/address.route.js";
import orderRouter from "./route/order.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// middleware
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/vendor", vendorRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
