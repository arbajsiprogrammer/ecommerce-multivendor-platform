import express from "express";
import { db } from "../util/db.util.js";
import { verifyAuthToken } from "../middleware/auth.middleware.js";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controller/admin.controller.js";

const router = express.Router();

router.get("/categories", verifyAuthToken, getAllCategories);
router.get("/categories/:id", verifyAuthToken, getCategory);
router.put("/categories/:id", verifyAuthToken, updateCategory);
router.post("/categories", verifyAuthToken, addCategory);
router.delete("/categories/:id", verifyAuthToken, deleteCategory);

export default router;
