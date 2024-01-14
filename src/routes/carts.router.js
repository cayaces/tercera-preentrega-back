import { Router } from "express";
import { getCarts, getCartsById, createCarts, addProduct } from "../controllers/carts.controllers.js"; 

const router = Router()
router.get("/",getCarts)
router.get("/:cid",getCartsById)
router.post("/",createCarts)
router.post("/:cid/product",addProduct)

export default router