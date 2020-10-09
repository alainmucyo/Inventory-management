import bcrypt from "bcrypt";
import {generateToken} from '../middlewares/verifyToken'
import models from "../models";
import { loginValidation, signupValidation } from "../validator/userValidation";
import { onError, onSuccess } from "../utils/response";

export class UserController {
  // create user
  static async createUser(req, res) {
    // validate signup
    const { error } = signupValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    // check user if is already an admin

    const emailExist = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (emailExist) return onError(res, 400, "Email already exist");

    // Hash passwords

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      const user = await models.User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const saveUser = await user.save();
      return onSuccess(res, 201, "Admin Signup successfully", saveUser);
    } catch (err) {
      console.log(err);
      return onError(res, 500, "Internal Server error");
    }
  }
  static async loginUser(req, res) {
    const { error } = loginValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    // check if is exists

    const user = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (!user) return onError(res, 401, "Invalid Email or Password");

    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return onError(res, 401, "Invalid Email or Password");

    // create a token

    const token = generateToken(user);
    res.header("auth-token", token).json({
      token,
      message: "User Logged in successfully",
    });
  }
  static async deleteUser(req, res) {
    const user = await models.User.findOne({ where: { id: req.params.id } });

    try {
      if (!user)
        return onError(res, 404, "user you are trying to delete doesn't exist");
      else {
        const oneUser = await user.destroy();
        return onSuccess(res, 200, "user deleted successfully", oneUser);
      }
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
  }
}
