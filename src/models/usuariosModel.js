const fs = require('fs');
const path = require('path');
const archivoUsuarios = path.join(__dirname, "../database/usuarios.json");

function agregarUsuario(usuario) {
    // Leer archivo usuarios.json y agregar un usuario al arreglo
    let usuariosF = fs.readFileSync(archivoUsuarios);
    let usuarios = JSON.parse(usuariosF);

    usuarios.usuarios.push(usuario);

    fs.writeFile(archivoUsuarios, JSON.stringify(usuarios), function (err) {
        if (err) throw err;
        console.log('Archivo usuarios modificado!');
        //console.log(usuarios);
    });
}

function getUsers() {
    return new Promise((resolve, reject) => {
        fs.readFile(archivoUsuarios, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}




module.exports = {
    agregarUsuario,
    getUsers
}