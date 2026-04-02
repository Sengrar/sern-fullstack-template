import db from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";

const { User } = db;

// export const updateProfile = async () => {
//     const user = await User.findOne({where: {email}})

//     if(!user){
//         throw new ApiError("400", "")
//     }
// }