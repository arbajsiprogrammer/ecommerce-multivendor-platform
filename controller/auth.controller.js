import authSchema from "../model/authSchema.model.js";
import {
  generateToken,
  hashPassword,
  verifyPassword,
} from "../service/auth.service.js";
import { db } from "../util/db.util.js";

const signup = async function (req, res) {
  try {
    const user = req.body;
    console.log(req.body, "inside signup function...");

    // validating the input
    const result = authSchema.validate(user);
    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }

    // check if exist or not
    const [existing_user] = await db.execute(
      `select * from ${user.role}s where phone_number = ?`,
      [user.phone_number],
    );

    if (existing_user.length > 0) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await hashPassword(user.password);

    const [rows] = await db.execute(
      `insert into ${user.role}s (first_name,last_name,password, phone_number  ) values (?,?,?,?)`,
      [user.first_name, user.last_name, hashedPassword, user.phone_number],
    );
    console.log(rows);

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async function (req, res) {
  try {
    const { phone_number, password, role } = req.body;

    const [existing_user] = await db.execute(
      `select * from ${role}s where phone_number = ?`,
      [phone_number],
    );

    if (existing_user.length == 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await verifyPassword(password, existing_user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials...password not match" });
    }

    const token = await generateToken({
      phone_number,
      role,
      id: existing_user.id,
    });

    if (token) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
    } else {
      return res.status(400).json({ message: "token generation failed" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async function (req, res) {
  try {
    const role = req.user.role;
    const phone_number = req.user.phone_number;
    const id = req.userId;

    const [existing_user] = await db.execute(
      `select * from ${role}s where id = ?`,
      [id],
    );

    if (existing_user.length == 0) {
      return res.status(400).json({ message: "user not found" });
    }

    if (role) {
      const row = await db.execute(
        `delete from ${req.user.role}s where phone_number=?`,
        [req.user.phone_number],
      );
      console.log(row);
      return res.status(200).json({ message: "logout successfully " });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const profile = async function (req, res) {
  try {
    const id = req.userId;
    const role = req.user.role;

    const [existing_user] = await db.execute(
      `select * from ${role}s where id = ?`,
      [id],
    );

    if (existing_user.length == 0) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(existing_user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export { signup, login, logout, profile };
