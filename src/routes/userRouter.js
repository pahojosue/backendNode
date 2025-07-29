import express from "express";
import { createUser, getAllUsers } from "../controllers/utilisateurController.js";
import { registerValidation } from "../middlewares/validation.js";

const userRouter = express.Router();

userRouter.get('/', getAllUsers);

userRouter.post('/', registerValidation, createUser);

export default userRouter;