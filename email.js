const nodemailer = require('nodemailer')

module.exports = {
    send: function (mailOptions) {
        let transporter = nodemailer.createTransport({
            host: 'asmtp.unoeuro.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                console.log("Message sent")
            }
        })
    }
}