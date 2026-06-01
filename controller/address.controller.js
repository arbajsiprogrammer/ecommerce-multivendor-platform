// pickup address

import { db } from "../util/db.util.js";

// add pickup address
const addPickupAddress = async function (req, res) {
  try {
    const { address, state, city, pin_code } = req.body;

    const vendorId = req.user.id;
    const role = req.user.role;

    if (role !== "vendor") {
      return res
        .status(403)
        .json({ message: "Only vendor can add pickup address" });
    }
    const [row] = await db.execute(
      "INSERT INTO pickup_address (vendor_id, address, state, city, pin_code) VALUES (?, ?, ?, ?, ?)",
      [vendorId, address, state, city, pin_code],
    );
    return res
      .status(200)
      .json({ message: "Pickup address added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: " Internal server error " });
  }
};

// get pickup address
const getPickupAddress = async function (req, res) {
  try {
    const vendorId = req.user.id;
    const role = req.user.role;

    if (role !== "vendor") {
      return res
        .status(403)
        .json({ message: "Only vendor can get pickup address" });
    }
    const [rows] = await db.execute(
      "SELECT * FROM pickup_address WHERE vendor_id = ?",
      [vendorId],
    );
    return res.status(200).json({ pickup_addresses: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: " Internal server error " });
  }
};

// update pickup address
const updatePickupAddress = async function (req, res) {
  try {
    const { address, state, city, pin_code } = req.body;

    const vendorId = req.user.id;
    const role = req.user.role;
    const pickupAddressId = req.params.id;

    if (role !== "vendor") {
      return res
        .status(403)
        .json({ message: "Only vendor can update pickup address" });
    }
    const [row] = await db.execute(
      "UPDATE pickup_address SET address = ?, state = ?, city = ?, pin_code = ? WHERE vendor_id = ? AND id = ?",
      [address, state, city, pin_code, vendorId, pickupAddressId],
    );
    return res
      .status(200)
      .json({ message: "Pickup address updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: " Internal server error " });
  }
};

// delete pickup address
const deletePickupAddress = async function (req, res) {
  try {
    const vendorId = req.user.id;
    const role = req.user.role;
    const pickupAddressId = req.params.id;
    if (role !== "vendor") {
      return res
        .status(403)
        .json({ message: "Only vendor can delete pickup address" });
    }
    const [row] = await db.execute(
      "DELETE FROM pickup_address WHERE vendor_id = ? AND id = ?",
      [vendorId, pickupAddressId],
    );
    return res
      .status(200)
      .json({ message: "Pickup address deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: " Internal server error " });
  }
};

// delivery address (customers delivery address)
// add delivery address
const addDeliveryAddress = async function (req, res) {
  try {
    const { address, state, city, pin_code } = req.body;

    const customerId = req.user.id;
    const role = req.user.role;

    if (role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customer can add delivery address" });
    }
    const [row] = await db.execute(
      "INSERT INTO delivery_address (customer_id, address, state, city, pin_code) VALUES (?, ?, ?, ?, ?)",
      [customerId, address, state, city, pin_code],
    );
    return res
      .status(200)
      .json({ message: "Delivery address added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: " Internal server error " });
  }
};

// get delivery address
const getDeliveryAddress = async function (req, res) {
  try {
    const customerId = req.user.id;
    const role = req.user.role;

    if (role != "customer") {
      return res
        .status(403)
        .json({ message: "Only customer can get delivery address" });
    }
    const [rows] = await db.execute(
      "SELECT * FROM delivery_address WHERE customer_id = ?",
      [customerId],
    );
    return res.status(200).json({ delivery_addresses: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: " Internal server error " });
  }
};

// update delivery address
const updateDeliveryAddress = async function (req, res) {
  try {
    const { address, state, city, pin_code } = req.body;

    const customerId = req.user.id;
    const role = req.user.role;
    const deliveryAddressId = req.params.id;
    if (role != "customer") {
      return res
        .status(403)
        .json({ message: "Only customer can update delivery address" });
    }
    const [row] = await db.execute(
      "UPDATE delivery_address SET address = ?, state = ?, city = ?, pin_code = ? WHERE customer_id = ? AND id = ?",
      [address, state, city, pin_code, customerId, deliveryAddressId],
    );
    return res
      .status(200)
      .json({ message: "Delivery address updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: " Internal server error " });
  }
};

// delete delivery address
const deleteDeliveryAddress = async function (req, res) {
  try {
    const customerId = req.user.id;
    const role = req.user.role;
    const deliveryAddressId = req.params.id;

    if (role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customer can delete delivery address" });
    }

    const [row] = await db.execute(
      "DELETE FROM delivery_address WHERE customer_id = ? and id = ?",
      [customerId, deliveryAddressId],
    );

    return res
      .status(200)
      .json({ message: "Delivery address deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: " Internal server error " });
  }
};

export {
  addPickupAddress,
  getPickupAddress,
  updatePickupAddress,
  deletePickupAddress,
  addDeliveryAddress,
  getDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress,
};
