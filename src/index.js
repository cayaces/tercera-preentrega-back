import express from "express";
import mongoose from 'mongoose';
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";
import session from "express-session";
import sessionConfig from "./config/session.config.js";
import{ connectMongo }  from "./config/auth.mongo.config.js";
import dotenv from 'dotenv';
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import bodyParser from "body-parser"
import nodemailer from "nodemailer"
import { recuperacionRouter } from "./router/nodemailer.router.js"
import { verificarExpiracionRouter }from "./router/nodemailer.router.js";
//import { solicitarRecuperacionController } from "./router/nodemailer.router.js";
//import { resetPasswordRouter } from "./router/reset-password.router.js"
import { resetPasswordRouter } from "./router/nodemailer.router.js"
//import UserService from "./services/UserService.js";
//import { UserService } from "./services/UserService.js";
//import { productRouter } from './router/product.router.js';
import ProtectedRouter from "./router/authJWT.router.js"

dotenv.config();

import ViewsRouter from "./router/views.router.js";
import productsRouter from "./router/products.router.js";
import cartsRouter from "./router/carts.router.js";
import UserRouter from "./router/user.router.js";

const app = express()
const PORT = 8080

app.listen(PORT, () => console.log(`Escuchando servidor en puerto ${PORT}`))

connectMongo()
app.use(session(sessionConfig))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

//nodemailer
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//app.use("/", express.static(__dirname + "/public"))
app.use("/", express.static(path.resolve(__dirname, "public")));

app.use("/", resetPasswordRouter); 
app.use("/recuperacion", recuperacionRouter);
//app.use("/solicitar-recuperacion", solicitarRecuperacionController)
app.use("/", verificarExpiracionRouter);
app.use("/", ViewsRouter)
app.use("/api/users", UserRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/products", productsRouter)
//app.use("/api/products", productRouter)
app.use('/protected', ProtectedRouter);