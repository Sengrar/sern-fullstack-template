import logger from "../config/logger.js";

const auditLog = ({ action, userId = null, status = "SUCCESS", details = {}, req }) => {
  logger.info({
    type: "AUDIT",
    action,
    status,
    userId,
    details,

    method: req.method,
    url: req.originalUrl,

    ip: req.ip,
    userAgent: req.headers["user-agent"],

    timestamp: new Date().toISOString(),
  });
};

export default auditLog;






// import logger from "../config/logger.js";

// const auditLog = ({ action, userId, details, req }) => {
//   logger.info("User Activity", {
//     action,
//     userId,
//     details,
//     ip: req.ip,
//     userAgent: req.headers["user-agent"],
//   });
// };

// export default auditLog;