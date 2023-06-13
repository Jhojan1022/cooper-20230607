const fs = require('fs');
const path = require('path');
const archivoCargos = path.join(__dirname, "../database/cargos.json");

function getCargos() {
    return new Promise((resolve, reject) => {
        fs.readFile(archivoCargos, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                try {
                    const cargos = JSON.parse(data); // Parsear el contenido del archivo como JSON
                    resolve(cargos); // Resolver la promesa con los datos obtenidos
                } catch (error) {
                    reject(error); // Rechazar la promesa si hay un error al parsear el JSON
                }
            }
        });
    });
}

module.exports = {
    getCargos
}