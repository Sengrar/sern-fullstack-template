import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import db from "./models/index.js";
import logger from "./config/logger.js";



const PORT = process.env.PORT || 5000;

// logger.info("TEST INFO");
// logger.error("TEST ERROR");

// Graceful shutdown
const shutdown = async (signal) => {
  logger.warn(`Received ${signal}. Shutting down gracefully...`);
  try {
    await db.sequelize.close();
    logger.info("Database connection closed.");
    // process.exit(0);

    // ✅ Give Winston time to flush logs
    setTimeout(() => {
      process.exit(0);
    }, 500);

  } catch (error) {
    // logger.error("Error during shutdown", error); 👈👈
    logger.error("Error during shutdown", {
      message: error.message,
      stack: error.stack,
    });
    // process.exit(1);

    // ✅ Give Winston time to flush logs
    setTimeout(() => {
      process.exit(1);
    }, 500);
  }
};

// Handle unexpected errors
process.on("unhandledRejection", (err) => {
  // logger.error("Unhandled Rejection", err); 👈👈
  logger.error("Unhandled Rejection", {
    message: err.message,
    stack: err.stack,
  });
  // process.exit(1); //[log + monitor, not always exit]

  // optional in production
  // shutdown("unhandledRejection");
});

process.on("uncaughtException", (err) => {
  // logger.error("Uncaught Exception", err); 👈👈
  logger.error("Uncaught Exception", {
    message: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

// Start server
const startServer = async () => {
  // console.log("🔥 Inside startServer");

  try {
    // console.log("🔥 Before DB connect");
    logger.info("Starting DB connection..."); // 👈 

    await db.sequelize.authenticate();
    logger.info("Database connected successfully");
    // console.log("🔥 After DB connect");

    if (process.env.NODE_ENV === "development") {
      await db.sequelize.sync({});
      // await db.sequelize.sync();
    }

    app.listen(PORT, () => {
      // console.log("🔥 Server running");
      logger.info(`Server started on port ${PORT}`);

      // logger.info("Server started successfully", {
      //   port: PORT,
      //   env: process.env.NODE_ENV,
      // });

      if (process.env.NODE_ENV === "development") {
        logger.error("TEST ERROR AFTER START");      // 👈 
      }
    });

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    // process.on("exit", () => {
    //   logger.end && logger.end();  //👉 May cut logs unexpectedly
    // });

  } catch (error) {
    // console.error("❌ ERROR:", error);
    // logger.error("Failed to start server", error); 👈👈
    logger.error("Failed to start server", {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

startServer();

setTimeout(() => {
  logger.info("DELAYED LOG TEST");
}, 2000);