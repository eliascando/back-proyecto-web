const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '85.10.205.173',
    user: 'tokio6',
    password: 'semestre6!',
    database:'proyecto_web_6'
});

connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('DB conectada!.');
    }
});  

module.exports = connection;