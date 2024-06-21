const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const jwt = require('jsonwebtoken')

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    console.log("Cookies gesetzt: ", res.getHeader('Set-Cookie')); // Debugging Ausgabe
    res.status(statusCode).json({ success: true, token });
};

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body

    const existing_email = await User.findOne({ email })

    if (existing_email) {
        return next(new ErrorResponse("Email already in use", 400))
    }

    try {
        const user = await User.create({ username, email, password })
        sendToken(user, 201, res)
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and/or passoword", 400))        
    }

    try {
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401))
        }

        const isMatch = await user.matchPasswords(password)
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401))
        }

        sendToken(user, 200, res)

    } catch (err) {
        next(err)
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('refreshToken')
    return res.status(200).json({ success: true, message: "Logged out"})
}

exports.getRefreshToken = async (req, res, next) => {
    try {
        console.log("Received request for refresh token");
        console.log("Request Cookies: ", req.cookies); // Log the cookies

        const getToken = req.cookies.refreshToken;
        console.log("Refresh Token:", getToken);

        if (getToken) {
            const token = jwt.verify(getToken, process.env.JWT_REFRESH_SECRET);
            console.log("Verified Token: ", token);

            const accessToken = jwt.sign({ id: token.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRE });
            console.log("New Access Token: ", accessToken);

            res.status(200).json(accessToken);
        } else {
            throw new Error("No refresh token provided");
        }
    } catch (err) {
        console.error("Error during refresh token process:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message }); // Return a detailed error response
        next(err);
    }
}

exports.getSubscription = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        console.log("getSubscription für User: ", user)
        console.log("-> ", user.subscription)
        res.status(200).json({ subscription: user.subscription })
    } catch (err) {
        next(err)
    }
}

exports.getCustomer = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({ customerId: user.customerId })
    } catch (err) {
        next(err)
    }
}