import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { refreshToken, accessToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }

}

const registerUser = asyncHandler(
    async (req, res) => {
        const { username, email, password } = req.body;

        if (!username  || !email || !password) {
            throw new ApiError(400, "All fields are required")
        }

        const existedUser = await User.findOne(
            {
                $or: [{ username }, { email }]
            }
        )

        if (existedUser) {
            throw new ApiError(409, "User already exists")
        }

        const avatarLocalePath = req.file?.avatar[0]?.path

        if (!avatarLocalePath) {
            throw new ApiError(400, "Avatar file is required")

        }

        const avatarUrl = await uploadOnCloudinary(avatarLocalePath)

        if (!avatarUrl) {
            throw new ApiError(400, "Avatar file is not uploaded")
        }

        const user = await User.create({
            username: username.toLowerCase(),
            email,
            password,
            avatar: avatarUrl.url
        })

        const registeredUser = await User.findById(user._id).select("-password")

        if (!registeredUser) {
            throw new ApiError(500, "Something went wrong while registering the user")

        }

        return res.status(201).json(
            new ApiResponse(200, registeredUser, "User registered Successfully")
        )

    }
)

const loginUser = asyncHandler(
    async (req, res) => {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new ApiError(400, "All fields are required")
        }

        const user = await User.findOne(
            {
                $or: [{ username }, { email }]
            }
        )


        if (!user) {
            throw new ApiError(404, "User does not exist")
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password)

        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid user credentials")

        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "User logged In Successfully"
                )
            )

    }
)

const getCurrentUser = asyncHandler(
    async (req, res) => {
        return res
            .status(200)
            .json(
                new ApiResponse(200, req.user, "User fetched successfully")
            )


    }
)

const logoutUser = asyncHandler(
    async (req, res) => {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User logged Out"))


    }
)

export {registerUser,loginUser,logoutUser,getCurrentUser}