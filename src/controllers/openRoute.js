import { prisma } from "../../config/config.js";

export const openRoute = async (req, res) => {
    // const user = req.user;

    // const fetchedUser = await prisma.utilisateur.findUnique({
    //     where: {
    //         id: user.userId,
    //     },
    // });
    const tokens = req.tokens;

    return res.json({message: "You now have access to this site", tokens: tokens});
};