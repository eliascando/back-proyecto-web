const bcrypt = require('bcrypt');
const connection = require('../connection/connection');

const validarUsuario = (req, res) => {
    const {correo, password} = req.body;

    try{
        if(!correo || !password){
            res.status(401)
                  .json({status: "error", error: "Debe ingresar un correo y una contraseña"});
        }
        
        connection.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (error, results) => {
            if(error){
                console.log(error);
            }else{
                if(results.length == 0 || !(await bcrypt.compare(password, results[0].password))){
                    res.status(401)
                       .json({status: "error", error: "Usuario o contraseña incorrectos"});
                }else{
                    res .status(200)
                       .json({status: "ok", data: results[0]});
                }
            }
        });
    }catch(error){
        console.log(error);
    }
}

const registrarUsuario = async (req, res) => {
    const { cedula, nombres, apellidos, edad, correo, password } = req.body;

    if(!cedula || !nombres || !apellidos || !edad || !correo || !password){
        res.status(401)
              .json({status: "error", error: "Debe ingresar todos los campos"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let usuario = {
        cedula: cedula, 
        nombres: nombres, 
        apellidos: apellidos, 
        edad: edad, 
        correo: correo, 
        password: hashedPassword
    }

    connection.query('INSERT INTO usuarios SET ?', usuario, (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.status(200)
               .json({status: "ok",
                        message: "Usuario registrado exitosamente", 
                        data: results, 
                        user: usuario
                });
        }
    });
}

const obtenerUsuarios = (req, res) => {
    connection.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            console.log(error);
        }else{
            res.status(200)
               .json({status: "ok", data: results});
        }
    });
}

module.exports = {
    validarUsuario,
    registrarUsuario,
    obtenerUsuarios
}