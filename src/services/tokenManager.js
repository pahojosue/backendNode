import jwt from 'jsonwebtoken';
import { prisma } from '../../config/config.js';
import 'dotenv/config';

export const generateToken = (userId) => {
    const token = jwt.sign(
        {userId: userId},
        process.env.JWT_TOKEN_SECRET
    );

    return token;
};

export const generateTokenEmail = (userId, email) => {
    const token = jwt.sign(
        {userId: userId, email: email},
        process.env.JWT_TOKEN_SECRET,
        { expiresIn: '10s' }
    );

    return token;
};

export const generateRefreshTokenEmail = (userId, email) => {
    const token = jwt.sign(
        {userId: userId, email: email},
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: '20d' }
    );

    return token;
};

export const verifyToken = (token) => {
    const verifiedId = jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, verifiedId) => {
        if(err) {
            return "";
        }
        console.log(verifiedId);
        return verifiedId;
    });
    return verifiedId;
};

export const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if(!refreshToken) {
        return res.status(404).json({Error: "This refresh token doesn't exist"}).redirect('/api/users/login');
    }

    const accessToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("Could not Verify Refresh Token").redirect('/api/users/login');
        const token = jwt.sign({userId: user.userId, email: user.email}, process.env.JWT_TOKEN_SECRET, { expiresIn: "10s" });
        return token;
    });
    const newRefreshToken = jwt.sign({userId: accessToken.userId, email: accessToken.email}, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: '20d'});

    return {accessToken: accessToken, refreshToken: newRefreshToken};
};