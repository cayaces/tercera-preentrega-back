import Cart from "../dao/classes/carts.dao.js"

const cartService = new Cart()


export const getCarts = async (req, res) => {
    let result = await cartService.getCarts()

    if (!result) return res.status(500).send({status: "error", error: "Error en getCarts"})
    res.send({ status: "success", result })
}


export const getCartsById = async (req, res) => {
    const {cid} = req.params 
    let result = await cartService.getCartsById(cid)

    if (!result) return res.status(500).send({status: "error", error: "Error en getCartsById"})
    res.send({ status: "success", result })
}


export const createCarts = async (req, res) => {
    const cart = req.body 
    let result = await cartService.saveCart(cart)

    if (!result) return res.status(500).send({status: "error", error: "Error en createCarts"})
    res.send({ status: "success", result })
}


export const addProduct = async (req, res) => {
    let product = req.body
    let cart = await cartService.getCartsById(req.params.cid) 
    cart.products.push(product)
    await cartService.updateCart(cart._id, cart)
    res.send({ status: "success", result: "cart actualizado"})
}