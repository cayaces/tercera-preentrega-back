import productModel from '../dao/mongo/product.model.js';
import ProductService from '../services/ProductService.js';
import UserService from '../services/UserService.js';

const productService = new ProductService();

export async function getProducts(req, res) {

    try {
        if (!req.session.email) {
            return res.redirect("/login")
        }

        let limit = parseInt(req.query.limit) || 10;
        let allProducts = await productService.getProducts(limit);

        allProducts = allProducts.map(product => product.toJSON())
        const userData = {
            name: req.session.name,
            surname: req.session.surname,
            email: req.session.email,
            role: req.session.role
        }

        res.render("home", {
            title: "Pre Entrega tres",
            products: allProducts,
            user: userData
        });

    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }

}

export async function getProductById(req, res) {

    try {
        const prodId = req.params.pid;
        const prod = await productService.getProductById(prodId);
        if (!prod) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const productDetail = prod.toObject();
        res.render("prod", {
            title: "Detalle de Producto",
            product: productDetail
        });

    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }

}

export async function createProduct(req, res) {

    try {
        const { name, description, price } = req.body;
        const { user } = req

        const newProduct = await ProductService.createProduct({
            name,
            description,
            price,
            owner: user,
            userEmail: user ? user.email : null 
        });

        const owner = user ? user._id : 'admin';

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto.' });
    }

}


export async function updateProduct(req, res) {

    try {
        const { productId } = req.params;
        const updatedProduct = req.body;
        const { user } = req;

        const updated = await ProductService.updateProduct(productId, updatedProduct, user);

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
}

export async function deleteProduct(req, res) {

    try {
       
        const { productId } = req.params;
        const { user } = req;
        const deleted = await ProductService.deleteProduct(productId, user);

        res.json(deleted);

    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto.' });
    }
}

export async function getProductByLimit(req, res) {

    try {
        let limit = parseInt(req.params.limit)
        if (isNaN(limit) || limit <= 0) {
            limit = 10
        } res.send(await productService.getProductByLimit(limit))

    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

export async function getProductByPage(req, res) {

    try {
        let page = parseInt(req.params.page)
        if (isNaN(page) || page <= 0) {
            page = 1
        }

        const productsPerPage = 1
        res.send(await productService.getProductByPage(page, productsPerPage))

    } catch (error) {
        console.error('Error al obtener los productos por pagina:', error);
        res.status(500).json({ error: 'Error al obtener los productos por pagina' });
    }
}

export async function getProductByQuery(req, res) {

    try {
        let query = req.params.query
        res.send(await productService.getProductByQuery(query))

    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }

}

export async function getProductMaster(req, res) {

    try {
        let page = parseInt(req.params.page)
        let limit = parseInt(req.params.limit)
        let category = req.params.category
        let availability = req.params.availability
        let sortOrder = req.params.sortOrder

        if (isNaN(page) || page <= 0) {
            page = 1
        }

        if (isNaN(limit) || limit <= 0) {
            limit = 10
        }

        if (!category) {
            category = ''
        }

        if (!availability) {
            availability = ''
        }

        if (!sortOrder) {
            sortOrder = ''
        }

        res.send(await productService.getProductMaster(page, limit, category, availability, sortOrder))

    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

