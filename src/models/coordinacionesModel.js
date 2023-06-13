const fs = require('fs');
const path = require('path');
const archivoCoordinaciones = path.join(__dirname, "../database/coordinaciones.json");

function getCoordinaciones() {
    return new Promise((resolve, reject) => {
        fs.readFile(archivoCoordinaciones, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                try {
                    const coordinaciones = JSON.parse(data); // Parsear el contenido del archivo como JSON
                    resolve(coordinaciones); // Resolver la promesa con los datos obtenidos
                } catch (error) {
                    reject(error); // Rechazar la promesa si hay un error al parsear el JSON
                }
            }
        });
    });
}

module.exports = {
    getCoordinaciones
}