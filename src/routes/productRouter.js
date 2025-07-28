import express from "express";
import { createProduct, getAllProducts } from "../controllers/produitController.js";

const productRouter = express.Router();

productRouter.get('/', getAllProducts);

productRouter.post('/:id', createProduct);

export default productRouter;