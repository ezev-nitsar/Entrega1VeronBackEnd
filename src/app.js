import express from 'express';
import productsRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';

const app = express();
const PORT = 8080;

app.set('json spaces', 2)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
    console.log(`Server levantado en el puerto ${PORT}`)
});

/*









const manejoProductos = new ProductManager('./src/file.json');

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    res.set('Content-Type', 'application/json');
    const productos = await manejoProductos.getProducts();
    if (limit > 0) {
        res.send(productos.slice(0, limit));
    } else {
        res.send(productos);
    }
});



app.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    const productoBuscado = await manejoProductos.getProductById(productId);
    if (productoBuscado !== false) {
        res.set('Content-Type', 'application/json');
        res.send(productoBuscado);
    } else {
        res.send("Lo siento, no he encontrado un producto con ese id :-(");
    }
})


app.listen(PORT, () => {
    console.log(`Server levantado en el puerto ${PORT}`)
})
*/