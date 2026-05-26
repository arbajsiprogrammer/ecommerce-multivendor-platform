import { db } from "../util/db.util.js";

const getAllCategories = async function (req, res) {
  try {
    const role = req.user.role;

    console.log(role, "inside get all categories...");
    if (role !== "admin") {
      return res.status(400).json({ message: "user must be admin" });
    }

    const [categories] = await db.execute(`select * from categories`);
    console.log(categories, "inside categories..");
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCategory = async function (req, res) {
  try {
    const role = req.user.role;
    const categoryId = req.params.id;

    console.log(role, "inside get category...");
    if (role !== "admin") {
      return res.status(400).json({ message: "user must be admin" });
    }

    const [category] = await db.execute(
      `select * from categories where id = ?`,
      [categoryId],
    );
    console.log(category, "inside get category..");
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCategory = async function (req, res) {
  try {
    const role = req.user.role;
    const category = req.body.category;
    const categoryId = req.params.id;

    console.log(role, "inside get category...");
    if (role !== "admin") {
      return res.status(400).json({ message: "user must be admin" });
    }

    const [existing_category] = await db.execute(
      `select * from categories where id = ?`,
      [categoryId],
    );
    console.log(existing_category, "inside get category..");

    if (existing_category.length == 0) {
      return res.status(400).json({ message: "category not found " });
    }
    const [row] = await db.execute(
      `update categories set category_name = ?, parent_category_id = ? where id = ?`,
      [
        category.category_name,
        category.parent_category_id || existing_category[0].parent_category_id,
        categoryId,
      ],
    );
    return res.status(200).json(row);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addCategory = async function (req, res) {
  try {
    const role = req.user.role;
    const category = req.body.category;

    console.log(role, "inside add category");

    console.log(category, "inside add category ");

    if (role != "admin") {
      return res.status(400).json({ message: "user must be admin" });
    }

    const [existing_category] = await db.execute(
      `select * from categories where category_name = ?`,
      [category.category_name],
    );
    console.log(existing_category, "existing  category");

    if (existing_category.length > 0) {
      return res.status(400).json({ message: "category already exists" });
    }

    const [row] = await db.execute(
      `insert into categories (category_name, parent_category_id) values (?,?)`,
      [category.category_name || "temp", category.parent_category_id || null],
    );
    console.log(row, "row ");

    return res.status(200).json({ message: "category added successfully " });
  } catch (error) {
    return res.status(500).json({ message: " inside add category " + error });
  }
};

const deleteCategory = async function (req, res) {
  try {
    const role = req.user.role;
    const categoryId = req.params.id;

    console.log(role, "inside get category...");

    if (role !== "admin") {
      return res.status(400).json({ message: "user must be admin" });
    }

    const [category] = await db.execute(
      `select * from categories where id = ?`,
      [categoryId],
    );

    if (category.length == 0) {
      return res.status(400).json({ message: " category not found " });
    }

    console.log(category, "inside get category..");

    const [row] = await db.execute(`delete from categories where id = ?`, [
      categoryId,
    ]);

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  getAllCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
