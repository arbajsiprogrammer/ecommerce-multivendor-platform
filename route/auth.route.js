import express from "express";
import { db } from "../util/db.util.js";
import { login, signup } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/auth/signup", signup);

router.post("/auth/login", login);

export default router;
