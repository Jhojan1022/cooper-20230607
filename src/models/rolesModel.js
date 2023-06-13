const fs = require('fs');
const path = require('path');
const archivoRoles = path.join(__dirname, "../database/roles.json");

function getRoles() {
    return new Promise((resolve, reject) => {
        fs.readFile(archivoRoles, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                try {
                    const roles = JSON.parse(data); // Parsear el contenido del archivo como JSON
                    resolve(roles); // Resolver la promesa con los datos obtenidos
                } catch (error) {
                    reject(error); // Rechazar la promesa si hay un error al parsear el JSON
                }
            }
        });
    });
}

module.exports = {
    getRoles
}
