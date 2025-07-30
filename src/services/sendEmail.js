import 'dotenv/config';
import nodemailer from 'nodemailer';

//Creating the transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAILPROVIDER_HOST,
    port: process.env.EMAILPROVIDER_PORT,
    secure: false, //Only true for port 465
    auth: {
        user: process.env.EMAILPROVIDER_USER,
        pass: process.env.EMAILPROVIDER_PASS,
    },
});

export async function sendVerificationMail(email, token) {
    await transporter.sendMail({
        from: '"Paho Test App" <fit.tchaptchet@gmail.com>',
        to: email,
        subject: "Verfication Code for Paho Test App",
        html: `<div style="width: 100%;">
        <h1 style="text-align: center; font-family: monospace; font-weight: bold; font-size: 24px;">Verify Your Account</h1>
        <div style="display: flex; justify-content: center;">
            <a href="http://${process.env.HOST}:3000/api/users/verify/${token}" style="text-decoration: none; color: white; background-color: blue; padding: 10px 20px; border: 1px solid blue; border-radius: 5px; font-weight: bold; font-family: monospace; font-size: 14px; margin:0 auto">Complete verification</a>
        </div>
            </div>`,
    });
    console.log("Email sent successfully.");
}