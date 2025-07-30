import { prisma } from '../../config/config.js';
import { verifyToken } from './verifyToken.js';


export const verifyUser = async (req, res, next) => {
    try {
        const givenToken = req.params.token;

        const verifiedId = verifyToken(givenToken);
        console.log("////");
        console.log(verifiedId);

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
