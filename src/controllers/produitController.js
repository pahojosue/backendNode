import { prisma } from "../../config/config.js";

export const createProduct = async (req, res) => {
    try {
        const { categoryId, name, description, price, status } = req.body;
        const userId = req.params.id;

        //Check if a required field is empty
        if(categoryId === undefined || name === undefined || description === undefined || price === undefined || !status) {
            return res.status(400).json({Error: "Fill all the required fields"});
        }

        await prisma.produit.create({
            data: {
                nom: name,
                description: description,
                prix: price,
                statut: status,
                categorie: {
                    connect: { id: categoryId },
                },
                utilisateur: {
                    connect: { id: userId },
                },
            },
        });

        return res.status(200).json({message: "New Product Successfully Created"});
    } catch (err) {
        return res.status(500).json({Error: err.message});
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.produit.findMany({});
        res.status(200).json(products);
    } catch (err) {
        return res.status.json({Error: err.message});
    }
};