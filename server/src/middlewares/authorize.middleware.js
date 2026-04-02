import { rolePermissions } from "../config/roles.js";
import { ApiError } from "../utils/ApiError.js";


// 🔥 Permission-based access
export const authorizePermissions = (...permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const userRole = req.user.role;
    const allowedPermissions = rolePermissions[userRole] || [];

    const hasPermission = permissions.some((perm) =>
      allowedPermissions.includes(perm)
    );

    if (!hasPermission) {
      throw new ApiError(403, "Forbidden");
    }

    next();
  };
};

// 🔥 Role-based access
export const authorizeRoles = (...roles) => {
  
  return (req, res, next) => {
    const {id} = req.user;
    if (!req.user) {
      throw new ApiError(401, "Unauthorized")
    }
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden");
    }

    req.data = {id};
    
    next();
  };
};
