import morgan from "morgan";
import logger from "../config/logger.js";

// Stream to send Morgan logs → Winston
const stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

// Custom format (optional but cleaner)
morgan.token("userId", (req) => req.user?.id || "guest");

const format = ":method :url :status :response-time ms - :res[content-length] :userId";

// Export middleware
const morganMiddleware = morgan(format, { stream });

export default morganMiddleware;