import express from "express";
import { createUser, getAllUsers } from "../controllers/utilisateurController.js";
import { loginUser, verifyUser } from "../controllers/authenticationController.js";
import { loginValidation, registerValidation } from "../middlewares/validation.js";
import { verifyLogin } from "../middlewares/verifyLogin.js";
import { openRoute } from "../controllers/openRoute.js";

const userRouter = express.Router();

userRouter.get('/', getAllUsers);

userRouter.get('/verify/:token', verifyUser, (req, res) => {
    res.send("You are now verified");
});

userRouter.get('/openRoute', verifyLogin, openRoute);

userRouter.post('/', registerValidation, createUser);

userRouter.post('/login', loginValidation, loginUser);

export default userRouter;