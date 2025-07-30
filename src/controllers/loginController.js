import { prisma } from "../../config/config.js";
import bcrypt from "bcryptjs";
import { generateTokenEmail } from "../services/generateToken.js";


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await prisma.utilisateur.findUnique({
            where: {
                email: email,
            },
        });
        // console.log(userExists.password);
        if (!userExists) {
            return res.status(404).json({ Error: "Incorrect email or password" });
        }

        if (userExists.verification_code != "") {
            return res.status(401).json({ Error: "You must first verify your account" });
        }

        // console.log(password);
        const existingPassword = userExists.password;
        const openPassword = await bcrypt.compare(password, existingPassword);
        // console.log(openPassword);
        if (!openPassword) {
            return res.status(404).json({ Error: "Incorrect email or password" });
        }

        const token = generateTokenEmail(userExists.id, userExists.email);
        
        //send token to cookie
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: false, //This will allow the token over http, put "true" in production
        //     sameSite: 'None', //This will allow cookies to be accesed if request comes from a different site or a different server
        // });

        return res.status(200).json({ message: "You are now logged In", token: token });
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
};
