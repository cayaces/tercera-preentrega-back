import Product from "../dao/classes/product.dao.js"
import Cart from "../dao/classes/carts.dao.js"
import User from "../dao/classes/user.dao.js"

const usersService = new User()
const productService = new Product()
const cartService = new Cart()


export const getProducts = async(req, res) => {
    let result = await productService.getProducts()
    res.send({ status: "success", result })
}


export const getProductById = async(req, res) => {
    const { pid } = req.params 
    let product = await productService.getProductById(pid)
    res.send({ status: "success", result: product })
}


export const createProduct = async(req, res) => {
    const { user, cart, products } = req.body 
    const resultUser = await usersService.getUserById(user)
    const resultCart = await cartService.getCartsById(cart)
    let actualProducts = resultCart.products.filter(product => products.includes(product.id))
    let sum = actualProducts.reduce((acc, prev) => {
        acc += prev.price 
        return acc
    }, 0)

    let productNumber = Date.now() + Math.floor(Math.random()* 10000+1)

    let product = {
        number: productNumber,
        cart,
        user,
        status: "Pending",
        products: actualProducts.map(product => product.id),
        totalPrice: sum
    }
    let productResult = await productService.createProduct(product)
    resultUser.products.push(productResult._id)
    await usersService.updateUser(user, resultUser) 
    res.send({ status: "success", productResult })
}
0

//resultado de resolver de resolver un tiket con una orden
export const resolveProduct = async(req, res) => {
    const { resolve } = req.query 
    let product = await productService.getProductById(req.params.pid)
    product.status = resolve
    await productService.resolveProduct(product._id, product)
    
    res.send({ status: "success", result: "Orden de Producto completada"})
}