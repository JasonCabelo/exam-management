const User = require('../models/Users');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto  =require('crypto')
exports.register = async (req, res, next) => {
    const { fName, lName, role, email, password } = req.body;
    try {
        const user = await User.create({fName,lName,role,email,password});
        sendToken(user, 201, res);
    } catch (error) {
        next(error);
        console.log(error);
    }
}
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please Complete All Fields!", 400));
    }
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid Credentials!", 404));
        }
        
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials!", 404));
        }
        sendToken(user, 201, res);

    } catch (error) {
        res.status(500).json({
error: error.message
        })
    }
}
exports.forgotpassword = async (req, res, next) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            next(new ErrorResponse("Email does Not Exist", 404));
        }
        const resetToken = user.getResetPassword();
        await user.save();
        const resetUrl = 'http://localhost:3000/resetpassword/' + resetToken;
        const message = `
        <h1>You Have Requested a Password Reset </h1>
        <p>Please Click the Link to Reset the Password </p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request", 
                text: message
            });
            res.status(200).json({
                success: true,
                data: "Email Sent successfully"
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            console.log(error)

            return next(new ErrorResponse(error,500));
            
        }
    } catch (error) {
        return next(new ErrorResponse(error,500));
    }

}
exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    try {
        const user = await User.findOne({resetPasswordToken, resetPasswordExpires: { $gt: Date.now() }
        })
        if (!user) {
            return next(new ErrorResponse("Invalid Token", 400));

        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            data: "Password reset successfully"
        })

    } catch (error) {
        next(error);
    }
}
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({
        success: true,
        token
    })
}