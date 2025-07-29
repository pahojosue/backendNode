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

export async function sendVerificationMail(email) {
    await transporter.sendMail({
        from: '"Paho Test App" <fit.tchaptchet@gmail.com>',
        to: email,
        subject: "Verfication Code for Paho Test App",
        text: "The verification code 1234ds was sent to your email",
    });
    console.log("Email sent successfully.");
}