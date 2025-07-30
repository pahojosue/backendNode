import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

