import express from "express";
import multerUpload from "../middlewares/multer.js";
import { createCategory } from "../controllers/categorieController.js";

const categoryRouter = express.Router();

categoryRouter.post('/', multerUpload.single("file"), createCategory);

export default categoryRouter;