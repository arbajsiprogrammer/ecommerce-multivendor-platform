import { db } from "../util/db.util.js";

const getAllProducts = async function (req, res) {
  try {
    const role = req.user.role;
    const phone_number = req.user.phone_number;
    const customerId = req.user.id;

    let products;

    // showing all products
    [products] = await db.execute(`select * from products`);

    console.log(products, " all products ");

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getProduct = async function (req, res) {
  try {
    const role = req.user.role;
    const phone_number = req.user.phone_number;
    const userId = req.user.id;
    const productId = req.params.id;

    let products;

    // showing only the vendors product
    [products] = await db.execute(`select * from products where id = ?`, [
      productId,
    ]);

    console.log(products, " product ");
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// get record by category
const getProductsByCategory = async function (req, res) {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).json({ message: "category ID not found" });
    }

    const [row] = await db.execute(
      `select * from products where category_id = ?`,
      [categoryId],
    );

    return res.status(200).json(row);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error : " + error });
  }
};

// Pagination
const getProductsByPage = async function (req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    console.log(typeof page, typeof limit, typeof offset);

    const [row] = await db.execute(
      `select * from products
      limit ${limit} offset ${offset}`,
    );

    return res.status(200).json(row);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export { getAllProducts, getProduct, getProductsByCategory, getProductsByPage };
