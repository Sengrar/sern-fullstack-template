import db from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";

const { User } = db;

export const registerUser = async (data) => {
  const { name, email, password } = data;

  if (!name || name.length < 3) {
    throw new ApiError(400, "Name must be at least 3 characters long");
  }

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const passRegex =
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;

  if (!passRegex.test(password)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters long and include: 2 uppercase letters, 3 lowercase letters, 2 numbers, and 1 special character (!@#$&*)"
    );
  }

  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
    role: "user", // 🔒 secure default
  });

  return user;
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  return user;
};