import authSchema from "../model/authSchema.model.js";
import { generateToken } from "../service/auth.service.js";
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

    const [rows] = await db.execute(
      `insert into ${user.role}s (first_name,last_name,password, phone_number  ) values (?,?,?,?)`,
      [user.first_name, user.last_name, user.password, user.phone_number],
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
      `select * from ${role}s where phone_number = ? and password = ?`,
      [phone_number, password],
    );
    if (existing_user.length == 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken({ phone_number, role });
    res.token = token;
    return res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { signup, login };
