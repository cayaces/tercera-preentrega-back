import express from "express";
import { getProducts, deleteProduct, createProduct, getProductById, getProductByLimit, getProductByPage, getProductByQuery, updateProduct } from "../controllers/products.controller.js";

const productRouter = express.Router()

productRouter.get("/", getProducts)
productRouter.get("/:pid", getProductById)
productRouter.post("/", createProduct)
productRouter.put("/:pid", updateProduct)
productRouter.delete("/:pid", deleteProduct)
productRouter.get("/limit/:limit", getProductByLimit)
productRouter.get("/page/:page", getProductByPage)
productRouter.get("/query/:query", getProductByQuery)
productRouter.delete('/:productId', deleteProduct);

export default productRouter;