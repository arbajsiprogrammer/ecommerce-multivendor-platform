import joi from "joi";

const authSchema = joi.object({
  phone_number: joi.string().required().max(15).min(10),
  password: joi.string().required().min(6).max(20),
  first_name: joi.string().required().max(50).min(2),
  last_name: joi.string().required().max(50).min(2),
  role: joi.string().required().valid("customer", "vendor", "admin"),
});

export default authSchema;
