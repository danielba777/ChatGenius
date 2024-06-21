const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide an username"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    customerId: {
        type: String,
        default: ""
    },
    subscription: {
        type: String,
        default: ""
    }
})

// Hash password before saving to database
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Match passwords
UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Sign JWT and return 
UserSchema.methods.getSignedToken = function(res) {
    const accessToken = jwt.sign({ id: this._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRE });
    const refreshToken = jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE });
    
    res.cookie('refreshToken', refreshToken, {
        maxAge: 86400 * 7000,
        httpOnly: true,
        secure: true, 
        sameSite: 'None' 
    });
    
    res.cookie('accessToken', accessToken, {
        maxAge: 86400 * 7000,
        httpOnly: true,
        secure: true, 
        sameSite: 'None' 
    });

    return { accessToken, refreshToken };
};

const User = mongoose.model("User", UserSchema)

module.exports = User