import { prisma } from "../../config/config.js";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = JSON.parse(req.body.data);
        const image = req.file.path;

        //Check if a required field is empty
        if( name === undefined || description === undefined || image === ''){
            return res.status(400).json({Error: "All the fields are required."});
        }

        await prisma.categorie.create({
            data: {
                nom: name,
                description: description,
                image: image,
            },
        });

        return res.status(200).json({message: "New category successfully created"});
    } catch (err) {
        return res.status(500).json({Error: err.message});
    }
};