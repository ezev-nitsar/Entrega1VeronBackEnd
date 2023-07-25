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