import ProductRepository from "../repositories/products.repository.js";
import ProductModel from '../dao/mongo/product.model.js';
import EmailService from "../config/nodemailer.config.js"

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    getProducts = async (limit) => {
        return await this.productRepository.getProducts(limit);
    }

    createProduct = async ({ name, description, price, owner, userEmail }) => {
        try {
            const ownerId = owner ? owner._id : 'admin';
             const newProduct = await ProductModel.create({ name, description, price, owner: ownerId });
             if (owner && owner.role === 'premium') {
                await this.sendPremiumUserEmail(userEmail, newProduct.name);
            }

            return newProduct;
        } catch (error) {
            console.log("Error al agregar producto: ", error);
            throw new Error("Error al agregar producto");
        }
    }


    sendPremiumUserEmail = async (userEmail, productName) => {
        try {
            const subject = 'Nuevo Producto Creado';
            const html = `
                <p>Hola Usuario Premium,</p>
                <p>Te informamos que se ha creado un nuevo producto: ${productName}.</p>
                <p>¡Gracias por ser un usuario premium!</p>
            `;

            await EmailService.sendEmail(userEmail, subject, html);
        } catch (error) {
            console.log("Error al enviar el correo electrónico premium: ", error);
            throw new Error("Error al enviar el correo electrónico premium");
        }
    }

    addProduct = async (product) => {
        return await this.productRepository.addProduct(product);

    }

    getProductById = async (productId) => {
        return await this.productRepository.getProductById(productId);
    }

    updateProduct = async (productId, updatedProduct, user) => {
        try {
            const product = await ProductModel.findById(productId);
            this.checkUserPermission(product, user);
            const updated = await ProductModel.findByIdAndUpdate(productId, updatedProduct, { new: true });

            return updated;
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            throw new Error('Error al actualizar el producto');
        }
    }

    deleteProduct = async (productId, user) => {
        try {
            const product = await ProductModel.findById(productId);
            this.checkUserPermission(product, user);
            this.checkAdminPermission(user);
             
            const deleted = await ProductModel.findByIdAndDelete(productId);

            return deleted;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            throw new Error('Error al eliminar el producto');
        }
    }

    checkUserPermission = (user) => {
         if (user.role !== 'admin') {
            throw new Error('No tienes permisos de administrador para realizar esta acción.');
        }
    }

    getProductByLimit = async (limit) => {
        return await this.productRepository.getProductByLimit(limit);

    }

    getProductByPage = async (page) => {
        return await this.productRepository.getProductByPage(page);

    }

    getProductByQuery = async (query) => {
        return await this.productRepository.getProductByQuery(query);
       
    }

    getProductMaster = async (page, limit, category, availability, sortOrder) => {
        return await this.productRepository.getProductMaster(page, limit, category, availability, sortOrder);
       
    }
}

export default ProductService;


