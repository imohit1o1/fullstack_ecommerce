import { User } from "../../models/user/user.model.js";
import { asyncHandler } from "../../utilis/asyncHandler.js";
import { ApiError } from "../../utilis/ApiError.js";
import { ApiResponse } from "../../utilis/ApiResponse.js";


//! Register the user
export const userRegister = asyncHandler(async (req, res, next) => {
    // taking the user info
    const { email, password } = req.body;
    // console.log(req.body);

    // chekcing all info provided by the user
    if (!email || !password) {
        throw new ApiError(400, "Please Fill Full Form!");
    }

    // check if the user already exists
    let existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(400, `${existedUser.role} with this Email already Registered`);
    }

    // finally create the user
    const createdUser = await User.create({
        email,
        password,
        role: "User",
    });

    return res.status(201).json(
        new ApiResponse(200, "User registered Successfully", createdUser)
    )
})