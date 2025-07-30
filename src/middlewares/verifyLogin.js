import jwt from 'jsonwebtoken';


export const verifyLogin = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "You don't have access to this resource" });
        }

        const verifiedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = verifiedUser;
        next();
    } catch (err) {
        res.clearCookie("token");
        res.status(400).json({ Error: err.message });
    }
};
