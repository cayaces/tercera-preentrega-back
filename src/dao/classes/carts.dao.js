import cartsModel from "../models/carts.model.js"

export default class Cart {

    getCarts = async () => {
        try {
            let result = await cartsModel.find()
            return result

        } catch (error) {
            console.log(error)
            return null
        }
    }


    getCartsById = async (id) => {
        try {
            let result = await cartsModel.findOne({ _id: id })
            return result

        } catch (error) {
            console.log(error)
            return null
        }
    }


    saveCart = async (cart) => {
        try {
            let result = await cartsModel.create(cart)
            return result

        } catch (error) {
            console.log(error)
            return null
        }
    }

    
    updateCart = async (id, cart) => {
        try {
            let result = await cartsModel.updateOne({ _id: id }, { $set: cart })
            return result

        } catch (error) {
            console.log(error)
            return null
        }
    }
}