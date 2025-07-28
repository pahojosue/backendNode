import { prisma } from "../../config/config.js";

export const addImage = async (req, res) => {
    try {
        const { imageName } = req.body;
        const productId = req.params.id;
        const imageUrl = req.file.path;

        //Check if a required field is empty
        if(imageName === undefined || productId === '' || imagePath === '') {
            return res.status(400).json({Error: "Fill all the required fields"});
        }

        await prisma.images.create({
            data: {
                imageUrl: imageUrl,
                imageName: imageName,
                produit: {
                    connect: { id: productId },
                },
            },
        });
    } catch (err) {
        return res.status(500).json({Error: err.message});
    }
};