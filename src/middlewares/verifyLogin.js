import jwt from 'jsonwebtoken';
import { refreshToken } from '../services/tokenManager.js';


export const verifyLogin = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "You don't have access to this resource" });
        }

        const verifiedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.tokens = verifiedUser;
        next();
    } catch (err) {
        if(err.message === "jwt expired") {
            const tokens = await refreshToken(req);
            req.tokens = tokens;
            next();
        }
        else {
            res.status(400).json({ Error: err.message });
        }
    }
};
