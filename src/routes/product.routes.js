import { Router } from 'express';
import { ProductManager } from '../productManager.js';

const manejoProductos = new ProductManager('./src/data/products.json');
const router = Router();

/*ROUTER QUE MANEJA LOS PRODUCTOS

Se llama desde /api/products

*/

//GET
router.get('/', async (req, res) => {
    const { limit } = req.query;
    res.set('Content-Type', 'application/json');
    const productos = await manejoProductos.getProducts();
    res.status(200);
    if (limit > 0) {
        res.send(productos.slice(0, limit));
    } else {
        res.send(productos);
    }
});

router.get('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const productoBuscado = await manejoProductos.getProductById(productId);
    res.set('Content-Type', 'application/json');
    if (productoBuscado !== false) {
        res.status(200);
        res.send(productoBuscado);
    } else {
        res.status(404);
        res.send('{"status": "failed", "message": "Product not found"}');
    }
});

//POST
router.post('/', async (req, res) => {
    res.set('Content-Type', 'application/json');
    const nuevoProducto = JSON.parse(await manejoProductos.addProduct(req.body));
    if (nuevoProducto.status === "ok") {
        res.status(201);
        res.send(`{"status": "ok"}`);
    } else {
        res.status(400);
        res.send(`{"status": "failed", "message": "${nuevoProducto.message}" }`);
    }
});

//PUT
router.put('/:pid', async (req, res) => {
    const productId = req.params.pid;
    res.set('Content-Type', 'application/json');
    const actualizarProducto = JSON.parse(await manejoProductos.updateProduct(parseInt(productId), req.body));
    if (actualizarProducto.status === "ok") {
        res.status(201);
        res.send(`{"status": "ok"}`);
    } else {
        res.status(400);
        res.send(`{"status": "failed", "message": "${actualizarProducto.message}" }`);
    }
});

//DELETE
router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;
    res.set('Content-Type', 'application/json');
    const eliminarProducto = JSON.parse(await manejoProductos.deleteProduct(parseInt(productId)));
    if (eliminarProducto.status === "ok") {
        res.status(200);
        res.send(`{"status": "ok"}`);
    } else {
        res.status(400);
        res.send(`{"status": "failed", "message": "${eliminarProducto.message}" }`);
    }
});


export default router;