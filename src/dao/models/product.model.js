import mongoose from "mongoose";

const collection = "Products"

const schema = new mongoose.Schema({
number: Number,
carts: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Carts"
},
user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users"
},
products: [],
totalPrice: Number

})

const productModel = mongoose.model(collection, schema)

export default productModel