const Routes = require('express').Router();

const { obtenerProductos, obtenerProductoPorUsuario, registrarProducto } = require('../controllers/productos.controller');

Routes.get('/', obtenerProductos);
Routes.get('/:cedula', obtenerProductoPorUsuario);
Routes.post('/registrar', registrarProducto);

module.exports = Routes;