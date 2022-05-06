const mongoose = require("mongoose");
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({

    fName: {
        type: String,
        required: [true, "Please Provide a First Name"],
    },
    lName: {
        type: String,
        required: [true, "Please Provide a Last Name"],
    },
    role: {
        type: String,
        required: [true, "Please Select a Role"],
    },
    email: {
        type: String,
        required: [true, "Please Provide an Email Address"],
        unique: true,
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please Provide a valid Email Address"
    ]
    },
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
        minLength: 8,
        select: false,

    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
UserSchema.methods.matchPasswords = async function (password) {
return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function () {
 return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn:process.env.JWT_EXPIRATION })
}
UserSchema.methods.getResetPassword = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpires = Date.now() + 10*(60*1000)
    return resetToken;
}
const User = mongoose.model("user", UserSchema);
module.exports = User;