import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User, user } from "../models/user.js";
import { cloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;

  if (
    [username, fullName, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    // Handle the case where any of the fields are empty
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = user.findOne({
    $or: [{ username }][{ email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user with email or username already exits");
  }
  //just like express gives req.body same thing multer gives us req.field
  const avatarLocalPath = req.files?.avatar[0]?.path; // its a way to get pic info in multer
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }

  const user = await user.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const CreatedUser = await User.findById(user._id).select(
    "-password -refreshToken" // when recalling user from db we write like this which fields are not required
  );

  if (!CreatedUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res.status(201).json(
    //returning a response by creating an object of a class
    new ApiResponse(200, CreatedUser, "user registered successfully")
  );
});

export { registerUser };
