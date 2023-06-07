const fs = require('fs');
const path = require('path');
const archivoSeguimientoHorarios = path.join(__dirname, "../database/seguimiento_horarios.json");


function registrarIngreso(data) {
    try {
        // Leer archivo usuarios.json y agregar un usuario al arreglo
        let shM = fs.readFileSync(archivoSeguimientoHorarios);
        let sh = JSON.parse(shM);

        // console.log({ id_seguimiento_horario: sh.seguimiento_horarios.length - 1 })

        sh.seguimiento_horarios.push({ id_seguimiento_horario: sh.seguimiento_horarios.length, ...data });

        fs.writeFile(archivoSeguimientoHorarios, JSON.stringify(sh), function (err) {
            if (err) throw err;
            console.log('Archivo seguimiento_horarios modificado!');
            //console.log(usuarios);
        });
    } catch (error) {
        console.log(error)
    }

}

function registrarSalida(fecha_salida, usuario) {
    try {
        let shM = fs.readFileSync(archivoSeguimientoHorarios);
        let sh = JSON.parse(shM);

        console.log("Actualizar salida laboral")
        sh.seguimiento_horarios.map((horario) => {
            if (horario.fecha_salida == '' 
            || horario.fecha_salida == undefined
            && horario.usuario == usuario
            )
            horario.fecha_salida = fecha_salida
        })

        fs.writeFile(archivoSeguimientoHorarios, JSON.stringify(sh), function (err) {
            if (err) throw err;
            console.log('Archivo seguimiento_horarios modificado!');
            //console.log(usuarios);
        });
    } catch (error) {
        
    }
}

function estadoHorarioLaboral() {
    return new Promise((resolve, reject) => {
        fs.readFile(archivoSeguimientoHorarios, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                try {
                    const seguimientoHorarios = JSON.parse(data); // Parsear el contenido del archivo como JSON
                    resolve(seguimientoHorarios); // Resolver la promesa con los datos obtenidos
                } catch (error) {
                    reject(error); // Rechazar la promesa si hay un error al parsear el JSON
                }
            }
        });
    });
}

module.exports = {
    registrarIngreso,
    estadoHorarioLaboral,
    registrarSalida
}