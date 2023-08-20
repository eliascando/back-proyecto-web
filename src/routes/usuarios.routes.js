const Routes = require('express').Router();

const { obtenerUsuarios, validarUsuario, registrarUsuario } = require('../controllers/usuarios.controller');

Routes.get('/', obtenerUsuarios);
Routes.post('/validar', validarUsuario);
Routes.post('/registrar', registrarUsuario);

module.exports = Routes;