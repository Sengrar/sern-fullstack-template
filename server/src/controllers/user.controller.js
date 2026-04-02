import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import auditLog from "../utils/auditLogger.js";

export const profile = asyncHandler(async (req, res) => {
    if(!req.user){
        throw new ApiError(401, "Unauthorized");
    }
    const {id, name, email, role} = req.user;

    auditLog({
        action: "PROFILE_FETCH",
        userId: id,
        req,
    })

    res.status(200).json(
        new ApiResponse(200, {id, name, email, role}, "Profile fetched successfully")
    ); 
});

export const admin = asyncHandler(async (req, res) => {

    auditLog({
        action: "ADMIN_ACCESS_GRANTED",
        userId: req.data.id,
        req,
    })

    res.status(200).json(
        new ApiResponse(200, {id: req.data.id}, "Access granted")
    )
})

// export const update =asyncHandler(async (req, res)=> {

// })

