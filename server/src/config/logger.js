
import winston from "winston";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// const logDir = path.resolve("logs"); // ✅ absolute path

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, "../logs");

// ✅ Ensure logs folder exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Console format (readable)
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create logger
const logger = winston.createLogger({
  level: "info",

  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    json() // for files
  ),

  defaultMeta: { service: "api-service", env: process.env.NODE_ENV },

  transports: [
    // ✅ Store all logs
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      level: "info",
      handleExceptions: true,
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
    }),

    // ✅ Store only errors
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

// Console logging (dev only)
if (process.env.NODE_ENV === "development") {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), consoleFormat),
    })
  );
}

export default logger;















// ====================================================================================================

// import winston from "winston";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// // import dotenv from "dotenv";
// // dotenv.config();

// // ✅ Fix for __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Now logs inside /server/logs
// const logDir = path.join(__dirname, "../logs");

// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir, { recursive: true });
// }

// const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// const consoleFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp} [${level}]: ${message}`;
// });

// const logger = winston.createLogger({
//   level: "info",

//   format: combine(
//     timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//     errors({ stack: true }),
//     json()
//   ),

//   transports: [
//     new winston.transports.File({
//       filename: path.join(logDir, "combined.log"),
//     }),
//     new winston.transports.File({
//       filename: path.join(logDir, "error.log"),
//       level: "error",
//     }),
//   ],
// });

// if (process.env.NODE_ENV === "development") {
//   logger.add(
//     new winston.transports.Console({
//       format: combine(colorize(), timestamp(), consoleFormat),
//     })
//   );
// }

// export default logger;

// =============================================================================================

/*
import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Console format (readable)
const consoleFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create logger
const logger = winston.createLogger({
  level: "info",

  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    json() // structured logs for files
  ),

  transports: [
    // Store all logs
    new winston.transports.File({
      filename: "logs/combined.log",
    }),

    // Store only errors
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

// Console logging (dev only)
if (process.env.NODE_ENV === "development") {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), consoleFormat),
    })
  );
}

export default logger;
*/