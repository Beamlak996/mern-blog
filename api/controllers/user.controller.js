import bcryptjs from "bcryptjs";

import { errorHandler } from "../utils/error.js";
import { User } from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "API is working!" });
};

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out!");
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.userId !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to delete this user!"));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.params.userId !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to update this user!"));
  }

  if (req.body.password) {
    if (req.body.password < 6) {
      return next(errorHandler(400, "Password must be atleast 6 characters!"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username < 7 || req.body.username > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters!")
      );
    }

    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces!"));
    }

    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase!"));
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          },
        },
        { new: true }
      );

      const { password: pass, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  }
};
