const connection = require('../connection/connection');

const obtenerProductos = (req, res) => {
    connection.query('SELECT * FROM producto', (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.status(200)
               .json({status: "ok", data: results});
        }
    });
}

const obtenerProductoPorUsuario = (req, res) => {
    const { cedula } = req.params;
    connection.query('SELECT * FROM producto WHERE cedula_usuario = ?', [cedula], (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.status(200)
               .json({status: "ok", data: results});
        }
    });
}

const registrarProducto = (req, res) => {
    const { nombre, precio, stock, categoria, talla, color, descripcion, cedula_usuario } = req.body;

    if(!nombre || !precio || !stock || !categoria || !talla || !color || !descripcion || !cedula_usuario){
        res.status(401)
              .json({status: "error", error: "Debe ingresar todos los campos"});
    }

    let producto = {
        nombre: nombre, 
        precio: precio, 
        stock: stock, 
        categoria: categoria, 
        talla: talla, 
        color: color, 
        descripcion: descripcion, 
        cedula_usuario: cedula_usuario
    }

    connection.query('INSERT INTO producto SET ?', producto, (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.status(200)
               .json({status: "ok",
                        message: "Producto registrado exitosamente", 
                        data: results, 
                        producto: producto
                });
        }
    });
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorUsuario,
    registrarProducto
}