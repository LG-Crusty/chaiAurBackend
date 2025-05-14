import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/aprError.js";
import userValidation from "../middlewares/zod.middleware.js";
import { User } from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/couldinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const data = req.body;
  const { username, fullName, password, email, avatar, rePassword } = data;

  User.findOne({
    $or: [{ username }, { email }],
  });

  const avatarLocalPath = req.file?.avatar[0]?.path;
  const coverImageLocalPath = req.file?.coverImage[1]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar must be provided");
  }

  const cloudAvatar = await uploadOnCloudinary(avatarLocalPath);
  const cloudCoverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!cloudAvatar) {
    throw new ApiError(400, "Avatar must be provided");
  }

  const Dbuser = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar: cloudAvatar.url,
    coverImage: cloudCoverImage?.url || "",
  });

 const createdUser = await User.findById(
    Dbuser._id
  ).select("-password -refreshToken ")
  
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong creating User")
  }
});

return res.status(200).json(
  new ApiResponse(
200, createdUser, "user registered successfully"
  )
)
export { registerUser };
