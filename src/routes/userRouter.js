import express from "express";
import { createUser, getAllUsers } from "../controllers/utilisateurController.js";
import { loginUser } from '../controllers/loginController.js';
import { loginValidation, registerValidation } from "../middlewares/validation.js";
import { verifyLogin } from "../middlewares/verifyLogin.js";
import { verifyUser } from "../services/verifyUser.js";

const userRouter = express.Router();

userRouter.get('/', getAllUsers);

userRouter.get('/verify/:token', verifyUser, (req, res) => {
    res.send("You are now verified");
});

userRouter.post('/login', loginValidation, loginUser);

userRouter.get('/openRoute', verifyLogin ,(req, res) => {
    console.log(req.user);
    res.send("You have access to this.");
});

userRouter.post('/', registerValidation, createUser);

export default userRouter;