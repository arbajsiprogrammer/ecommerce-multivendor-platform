import { productSchema } from "../model/productSchema.model.js";
import { db } from "../util/db.util.js";

// products API's
const addProduct = async function (req, res) {
  try {
    const product = req.body.product;
    const user = req.user;
    const userId = req.userId;

    if (!product) {
      return res.status(400).json({ message: "product details missing" });
    }

    const result = productSchema.validate({
      product_name: product.product_name,
      price: product.price,
    });

    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    const [row] = await db.execute(
      `insert into products (vendor_id, category_id, product_name, product_description, offers, discount, price, availability, product_highlights, return_policy, payment_support) values (?,?,?,?,?,?,?,?,?,?, ?)`,
      [
        product.vendor_id,
        product.category_id,
        product.product_name,
        product.product_description,
        product.offers,
        product.discount,
        product.price,
        product.availability,
        product.product_highlights,
        product.return_policy,
        product.payment_support,
      ],
    );

    return res
      .status(200)
      .json({ message: "product added successfully ", row });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
const getAllProducts = async function (req, res) {
  try {
    const role = req.user.role;
    const phone_number = req.user.phone_number;
    const id = req.user.id;

    let products;

    if (role == "vendor") {
      // showing only the vendors product
      [products] = await db.execute(
        `select * from products where vendor_id = ?`,
        [id],
      );
    } else {
      // showing all products
      [products] = await db.execute(`select * from products`);
    }

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
    const id = req.user.id;
    const productId = req.params.id;

    let products;

    if (role == "vendor") {
      // showing only the vendors product
      [products] = await db.execute(
        `select * from products where vendor_id = ? and id = ?`,
        [id, productId],
      );
    }
    console.log(products, "all products ");
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async function (req, res) {
  try {
    const role = req.user.role;
    const phone_number = req.user.phone_number;
    const id = req.user.id;
    const productId = req.params.id;

    let products;

    if (role == "vendor") {
      // showing only the vendors product
      [products] = await db.execute(
        `select * from products where vendor_id = ? and id = ?`,
        [id, productId],
      );
    }

    console.log(products, "all products ");

    if (!products) {
      return res.status(400).json({ message: "product not found" });
    }

    const [row] = await db.execute(
      `delete from products where vendor_id = ? and id = ?`,
      [id, productId],
    );

    return res.status(200).json({ message: "product deleted ", row });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async function (req, res) {
  try {
    const role = req.user.role;
    const phone_number = req.user.phone_number;
    const id = req.user.id;
    const productId = req.params.id;
    const product = req.body.product;

    let existing_products;

    if (role == "vendor") {
      // showing only the vendors product
      [existing_products] = await db.execute(
        `select * from products where vendor_id = ? and id = ?`,
        [id, productId],
      );
    }

    console.log(existing_products, " existing_products in update product ");

    if (!existing_products) {
      return res.status(400).json({ message: " product not found " });
    }

    const [row] = await db.execute(
      `update products set vendor_id = ?, category_id = ?, product_name = ?, product_description = ?, offers = ?, discount = ?, price = ?, availability = ?, product_highlights = ?, return_policy = ?, payment_support = ? where vendor_id = ? and id = ? `,
      [
        product.vendor_id,
        product.category_id,
        product.product_name,
        product.product_description,
        product.offers,
        product.discount,
        product.price,
        product.availability,
        product.product_highlights,
        product.return_policy,
        product.payment_support,
        id,
        productId,
      ],
    );

    return res.status(200).json({ message: "product updated ", row });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

//  product sku's
const getAllSKU = async function (req, res) {
  try {
    const role = req.user.role;
    const phone_number = req.user.phone_number;
    const id = req.params.id;
    console.log("role ", role, " phone_number ", phone_number, " id ", id);
    let products;

    if (role == "vendor") {
      // showing only the vendors product
      [products] = await db.execute(
        `select * from product_skus where product_id = ?`,
        [id],
      );
    } else {
      // showing all products
      [products] = await db.execute(`select * from products`);
    }

    console.log(products, " all sku products ");

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getSKU = async function (req, res) {
  try {
    const role = req.user.role;
    const phone_number = req.user.phone_number;
    const id = req.params.id;
    const productId = req.params.id;

    let product;

    if (role == "vendor") {
      // showing only the vendors product
      [product] = await db.execute(
        `select * from product_skus where id = ?  `,
        [id],
      );
    }

    console.log(product, " SKU  ");
    if (!product) {
      return res.status(400).json({ message: " product not found " });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const addSKU = async function (req, res) {
  try {
    const product = req.body.product;
    console.log(product, " sku data in addSKU ");
    const user = req.user;
    const userId = req.userId;

    if (!product) {
      return res.status(400).json({ message: "product details missing" });
    }

    const [row] = await db.execute(
      `insert into product_skus (product_id, color, size, price, available_stock, reserved_stock, sold_stock, availability_status) values (?,?,?,?,?,?,?,?)`,
      [
        product.product_id,
        product.color,
        product.size,
        product.price,
        product.available_stock,
        product.reserved_stock,
        product.sold_stock,
        product.availability_status,
      ],
    );

    return res
      .status(200)
      .json({ message: " product added successfully ", row });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateSKU = async function (req, res) {
  try {
    const role = req.user.role;
    const phone_number = req.user.phone_number;
    const id = req.user.id;
    const skuId = req.params.id;
    const product = req.body.product;

    let existing_products;

    if (role == "vendor") {
      // showing only the vendors product
      [existing_products] = await db.execute(
        `select * from product_skus where id = ?`,
        [skuId],
      );
    }

    console.log(existing_products, " existing_products in update product ");

    if (!existing_products) {
      return res.status(400).json({ message: " product not found " });
    }

    const [row] = await db.execute(
      `update product_skus set product_id = ?, color = ?, size = ?, price = ?, available_stock = ?, reserved_stock = ?, sold_stock = ?, availability_status = ? where id = ? `,
      [
        product.product_id,
        product.color,
        product.size,
        product.price,
        product.available_stock,
        product.reserved_stock,
        product.sold_stock,
        product.availability_status,
        skuId,
      ],
    );

    return res.status(200).json({ message: "product updated ", row });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteSKU = async function (req, res) {
  try {
    const role = req.user.role;
    const phone_number = req.user.phone_number;
    const id = req.user.id;
    const skuId = req.params.id;

    let product;

    if (role == "vendor") {
      // showing only the vendors product
      [product] = await db.execute(`select * from product_skus where id = ?`, [
        skuId,
      ]);
    }

    console.log(product, " sku in delete sku ");

    if (!product) {
      return res.status(400).json({ message: "sku not found" });
    }

    const [row] = await db.execute(`delete from product_skus where id = ?`, [
      skuId,
    ]);

    return res.status(200).json({ message: "product deleted ", row });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Product Images
const addImage = async function (req, res) {
  try {
    const image_url = req.body.image_url;
    const product_sku_ID = req.params.id;

    console.log(image_url, " image_url in add image ", product_sku_ID);

    if (!image_url) {
      return res.status(400).json({ message: "image url missing" });
    }

    if (!product_sku_ID) {
      return res.status(400).json({ message: "product sku ID missing" });
    }

    const [row] = await db.execute(
      `insert into images (product_skus_id, image_url) values(?,?)`,
      [product_sku_ID, image_url],
    );

    console.log(row);

    return res.status(200).json({ message: " image added successfully " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getImages = async function (req, res) {
  try {
    const product_sku_ID = req.params.id;

    if (!product_sku_ID) {
      return res.status(400).json({ message: "product skus id missing" });
    }

    const [row] = await db.execute(
      `select * from images where product_skus_id = ?`,
      [product_sku_ID],
    );

    return res.status(200).json(row);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteImage = async function (req, res) {
  try {
    const role = req.user.role;

    const product_sku_image_ID = req.params.id;

    if (req.user.role != "vendor" && req.user.role != "admin") {
      return res
        .status(400)
        .json({ message: "you are not allowed to delete image " });
    }

    if (!product_sku_image_ID) {
      return res.status(400).json({ message: "id is missing" });
    }

    const [existing_image] = await db.execute(
      `select * from images where id = ?`,
      [product_sku_image_ID],
    );

    if (existing_image.length == 0) {
      return res
        .status(400)
        .json({ message: `image with id ${product_sku_image_ID} not found ` });
    }

    if (role == "vendor") {
      const [vendorID] = await db.execute(
        `select p.vendor_id
        from images as i 
        inner join 
        product_skus as ps
        on ps.id = i.product_skus_id
        inner join 
        products as p
        on p.id = ps.product_id
        where p.vendor_id = ?`,
        [req.user.id],
      );

      if (vendorID.length == 0 || vendorID[0].vendor_id != req.user.id) {
        return res
          .status(400)
          .json({ message: "you are not allowed to delete this image " });
      }

      const [row] = await db.execute(`delete from images where id = ?`, [
        product_sku_image_ID,
      ]);
    } else if (role == "admin") {
      const [row] = await db.execute(`delete from images where id = ?`, [
        product_sku_image_ID,
      ]);
    }

    return res.status(200).json({ message: "image deleted successfully " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

// order tracking PATCH /orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status, remarks } = req.body;
    const role = req.user.role;

    if (role != "vendor" && role != "admin") {
      return res
        .status(400)
        .json({ message: "You are not authorized to update order status" });
    }

    const [existing_order] = await db.execute(
      `select * from order_tracks where id = ?`,
      [orderId],
    );

    if (existing_order.length == 0) {
      return res.status(400).json({ message: "order not found" });
    }

    const [row] = await db.execute(
      `update order_tracks set order_status = ?, remarks = ? where id = ?`,
      [
        status || existing_order[0].order_status,
        remarks || existing_order[0].remarks,
        orderId,
      ],
    );

    return res
      .status(200)
      .json({ message: "Order status updated successfully", row });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  // product
  getAllProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  // product SKU
  getAllSKU,
  getSKU,
  addSKU,
  updateSKU,
  deleteSKU,

  // images
  addImage,
  getImages,
  deleteImage,

  // update order status
  updateOrderStatus,
};
