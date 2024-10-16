const express = require('express');
const app = express();
const productsRoutes = require('./routes/products.js');
const port = 3000;

app.use(express.json());

// Rutas para productos
app.use('/products', productsRoutes);

// Global error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});