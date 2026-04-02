import jwt from "jsonwebtoken";
import db from "../models/index.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";

const { User } = db;

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  let token;

  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized Request");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or Expired Token");
  }

  const user = await User.findByPk(decodedToken.id);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  next();
});


