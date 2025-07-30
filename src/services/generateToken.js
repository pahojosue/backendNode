import jwt from 'jsonwebtoken';
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
        { expiresIn: '600s' }
    );

    return token;
};