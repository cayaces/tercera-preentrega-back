import { Router } from "express";
import { getProducts, getProductById, createProduct, resolveProduct } from "../controllers/products.controllers.js";

const router = Router()
router.get("/", getProducts)
router.post("/", createProduct)
router.get("/:pid", getProductById)
router.get("/:pid", resolveProduct)


export default router