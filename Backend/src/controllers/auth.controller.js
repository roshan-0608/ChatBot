import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// In production the frontend and backend live on different HTTPS domains,
// so cookies must be Secure + SameSite=None to be sent cross-site.
// Locally (HTTP) we use Lax so cookies still work without HTTPS.
const isProduction = process.env.NODE_ENV === "production";

const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
};


const generateAccessAndRefreshTokens = async (userId) => {
    try {

        const user = await User.findById(userId);
        console.log(user);

        const accessToken = user.generateAccessToken();

        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {

        throw new ApiError(
            500,
            "Something went wrong while generating tokens"
        );

    }
};

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    // 1. Validate input
    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({
        email
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    // 3. Create user
    const user = await User.create({
        username,
        email,
        password
    });

    // 4. Remove password before sending response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // 5. Return response
    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdUser,
                "User registered successfully"
            )
        );

});

const loginUser = asyncHandler(async (req, res) => {

    // Get data from frontend
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
        throw new ApiError(400, "Email and Password are required");
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // Compare password
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // Generate tokens
    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    // Remove sensitive fields
    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken");

    // Send response
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );

});

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        );

});

const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "Current user fetched successfully"
        )
    );

});

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    // Verify Refresh Token
    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    // Find User
    const user = await User.findById(decodedToken._id);

    if (!user) {
        throw new ApiError(401, "Invalid Refresh Token");
    }

    // Compare Refresh Token
    if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "Refresh Token is expired or used");
    }

    // Generate New Tokens
    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken,
                },
                "Access Token refreshed successfully"
            )
        );

});
export { registerUser, loginUser, logoutUser, getCurrentUser, refreshAccessToken };