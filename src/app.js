import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express()
const PORT = 8080

const connection = mongoose.connect("mongodb+srv://coderClau:7725AmorCODER@coderclau.lgoc83w.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//RUTAS
app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})