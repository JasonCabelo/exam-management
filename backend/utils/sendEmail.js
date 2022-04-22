const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config.env' });
const sendEmail = (options) => {

    const transporter = nodemailer.createTransport({


        host: process.env.SENDER_HOST,
        port: process.env.SENDER_PORT,
        secure: true,
        auth: {
         
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        logger: true
    })
    const mailOptions = {
        from: process.env.EMAIL,
            to: options.to,
        subject: options.subject,
            html: options.text
        
    }
    transporter.sendMail(mailOptions, function (err, info) {
        
        if (err) {
            console.log(err)
        }
        else {
            console.log(info);
        }
    })
}
module.exports =sendEmail