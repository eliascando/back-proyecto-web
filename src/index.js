const express = require('express');
const app = express();
const cors = require('cors');
const rutasUsuarios = require('./routes/usuarios.routes');
const rutasProductos = require('./routes/productos.routes');

const PORT = 3000;

//middlewares y configuraciones
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//rutas
app.use('/api/usuarios', rutasUsuarios);
app.use('/api/productos', rutasProductos);

//iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});