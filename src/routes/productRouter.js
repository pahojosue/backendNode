import express from "express";
import { createProduct, getAllProducts } from "../controllers/produitController.js";
import { verifyLogin } from "../middlewares/verifyLogin.js";

const productRouter = express.Router();

productRouter.get('/', getAllProducts);

productRouter.post('/:id', verifyLogin, createProduct);

export default productRouter;