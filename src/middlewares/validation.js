import Joi from "joi";
import { regexPasswordPattern } from "../utils/utils.js";

const passwordRegex = new RegExp(regexPasswordPattern);

export const registerValidation = (req, res, next) => {
    const data = req.body;
    const schema = Joi.object({
        name: Joi.string().required().messages({"any.required": "The name is required", "string.empty": "The name cannot be empty"}),
        userName: Joi.string().required().messages({"any.required": "The userName is required", "string.empty": "The userName cannot be empty"}),
        email: Joi.string().email().required().messages({"any.required": "The email is required", "string.empty": "The email cannot be empty", "string.email": "Please enter a valid email"}),
        password: Joi.string().required().pattern(passwordRegex).messages({"any.required": "The password is required", "string.empty": "The password cannot be empty", "string.pattern.base": "The password must consist of atleast one Uppercase, Lowercase, a digit and a symbol, and must be 8 characters long."}),
        contact: Joi.string().required().messages({"any.required": "The contact is required", "string.empty": "The contact cannot be empty"}),
        address: Joi.string().required().messages({"any.required": "The address is required", "string.empty": "The address cannot be empty"}),
        city: Joi.string().required().messages({"any.required": "The city is required", "string.empty": "The city cannot be empty"}),
        role: Joi.object().messages({"object.base": "The role must be of type JSON"}),
    });

    const result = schema.validate(data);
    if(result.error) {
        return res.status(400).json({Error: result.error.details[0].message});
    }

    req.body = result.value;
    return next();
};