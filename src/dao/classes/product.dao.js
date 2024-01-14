import productModel from "../models/product.model.js";

export default class Product {
    getProducts = async () => {
        try {
            let result = await productModel.find()
            return result

        } catch (error) {
            return null
        }
    }


    getProductById = async (id) => {
        try {
            let result = await productModel.findOne({_id:id})
            return result

        } catch (error) {
            console.log(error)
            return null
        }
    }


    createProduct = async (product) => {
        try {
            let result = await productModel.create(product)
            return result

        } catch (error) {
            console.log(error)
            return null
        }
    }


    resolveProduct = async (id, product) => {
        try {
            let result = await productModel.create({_id: id }, { $set: product})
            return result

        } catch (error) {
            console.log(error)
            return null
        }
    }
}