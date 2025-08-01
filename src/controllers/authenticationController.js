import { prisma } from "../../config/config.js";
import bcrypt from "bcryptjs";
import { verifyToken, generateTokenEmail, generateRefreshTokenEmail } from "../services/tokenManager.js";


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
        const refreshToken = generateRefreshTokenEmail(userExists.id, userExists.email);
        
        //send refreshToken to cookie
        // res.cookie("refreshToken", refreshToken, {
        //     httpOnly: true,
        //     secure: false, //This will allow the token over http, put "true" in production
        //     sameSite: 'None', //This will allow cookies to be accesed if request comes from a different site or a different server
        // });

        return res.status(200).json({ message: "You are now logged In", token: token, refreshToken: refreshToken });
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
};

export const verifyUser = async (req, res, next) => {
    try {
        const givenToken = req.params.token;

        const verifiedId = verifyToken(givenToken);

        if (!verifiedId) {
            return res.status(401).json({ Error: "Tokens doesn't match" });
        }

        await prisma.utilisateur.update({
            where: {
                id: verifiedId.userId,
            },
            data: {
                verification_code: "",
                updated_at: new Date(),
            },
        });

        return next();
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
};
