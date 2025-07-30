import {prisma} from '../../config/config.js';
import { numberRoundsHashing } from '../utils/utils.js';
import { sendVerificationMail } from '../services/sendEmail.js';
import { generateToken } from '../services/generateToken.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
    try {
        const { name, userName, email, password, role, contact, address, city } = req.body;

        //Check if email is already inUse
        const existingUserEmail = await prisma.utilisateur.findUnique({
            where: {
                email: email,
            }
        });
        if(existingUserEmail) {
            return res.status(400).json({Error: "Email already in use. Choose a new one"});
        }

        //Check if userName is already inUse
        const existingUserName = await prisma.utilisateur.findUnique({
            where: {
                nomUtilisateur: userName,
            },
        });
        if(existingUserName) {
            return res.status(400).json({Error: "UserName already in use. Choose a new one"});
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, numberRoundsHashing);

        const newUser = await prisma.utilisateur.create({
            data: {
                nom: name,
                nomUtilisateur: userName,
                email: email,
                password: hashedPassword,
                role: role,
                contact: contact,
                addresse: address,
                ville: city,
            },
        });

        const token = generateToken(newUser.id);
        await prisma.utilisateur.update({
            where: {
                id: newUser.id,
            },
            data: {
                verification_code: token,
            },
        });

        await sendVerificationMail(email, token);

        return res.status(200).json({message: "New user successfully created"});
    } catch (err) {
        return res.status(500).json({Error: err.message});
    }
};

export const addUpdateRole = async (req, res) => {
    try {
        const idUser = req.params.id;
        const { role } = req.body;

        //Check if the role is empty
        if(!role){
            return res.status(400).json({Error: "The role cannot be empty"});
        }
        //Check if the role is part of a predefined set of roles

        await prisma.utilisateur.update({
            where: {
                id: idUser,
            },
            data: {
                role: role,
                updated_at: new Date(),
            },
        });

        return res.status(200).json({message: "The role of the user was added or updated"});
    } catch (err) {
        return res.status(500).json({Error: err.message});
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.utilisateur.findMany({
            select: {
                nom: true,
                nomUtilisateur: true,
                email: true,
                role: true,
                contact: true,
                addresse: true,
                ville: true,
                produits: {
                    select: {
                        id: true,
                        nom: true,
                    },
                },
            },
        });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({Error: err.message});
    }
};