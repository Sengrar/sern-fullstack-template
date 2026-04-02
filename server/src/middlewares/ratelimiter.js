import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { ApiError } from "../utils/ApiError.js";

// 🌐 Global limiter
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false,  // disable old headers

//   message: {
//     success: false,
//     message: "Too many requests, please try again later.",
//   },

  handler: (req, res, next) => {
    next(new ApiError(429, "Too many requests, please try again later."));
  },
});

// 🔐 Auth limiter (login/register)
export const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max : 5,
    standardHeaders: true,
    legacyHeaders: false,

    skipSuccessfulRequests: true,

     // ✅(IPv6 safe)
    keyGenerator: (req) => {
        return req.body.email || ipKeyGenerator(req);
    },

    handler: (req, res, next) => {
        next(new ApiError(429, "Too many login attempts. Try again later."))
    },
});