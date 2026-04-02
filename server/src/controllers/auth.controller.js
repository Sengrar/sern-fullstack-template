import { registerUser, loginUser } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import auditLog from "../utils/auditLogger.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
};

export const register = asyncHandler(async (req, res) => {
    const user = await registerUser(req.body);

    auditLog({
        action: "USER_REGISTER",
        userId: user.id,
        req,
    });

    res.status(201).json(new ApiResponse(201, user, "User registered"));
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await loginUser(email, password);

    const token = generateToken(user);

    auditLog({
        action: "LOGIN_SUCCESS",
        userId: user.id,
        req,
    });

    res.cookie("token", token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(new ApiResponse(200, user, "User loggedin Successfully"));
})

export const logout = asyncHandler(async (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        throw new ApiError(401, "Unauthorized Request")
    };

    auditLog({
        action: "LOGOUT_SUCCESS",
        userId: token.id,
        req,
    })
    res.cookie("token", "", {
        ...cookieOptions,
        expires: new Date(0),
    });

    res.status(200).json(
        new ApiResponse(200, "Logout successfully")
    );
});