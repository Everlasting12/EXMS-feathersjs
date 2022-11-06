"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config()

// async..await is not allowed in global scope, must use a wrapper
async function main()
{
    let transporter = nodemailer.createTransport({
        host: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.AUTH_USER, // generated ethereal user
            pass: process.env.AUTH_PASS, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <sidheshpvalueaddsofttech.com>', // sender address
        to: "malamahit1947nahi@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
