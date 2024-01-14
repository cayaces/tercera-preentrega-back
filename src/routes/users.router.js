import { Router } from "express";
import { getUsers, getUserById, saveUser } from "../controllers/users.controllers.js";
 
const router = Router()
router.get("/", getUsers)
router.get("/", saveUser)
router.get("/:uid", getUserById)

export default router