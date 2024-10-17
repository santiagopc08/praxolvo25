const express = require('express');
const app = express();
const productsRoutes = require('./routes/products.js');
const port = 3000;
const resError = require('./utils/resError.js');

app.use(express.json());

// Rutas para productos
app.use('/products', productsRoutes);
app.use((err,req,res,next)=>{
    const { status, message } = err;
    resError(res,status,message);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});