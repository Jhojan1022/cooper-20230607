const fs = require('fs');

const path = require('path');




fs.writeFile(path.join(__dirname, "../database/usuarios.json"), '{"usuarios":[]}', function (err) {

    if (err) throw err;

    console.log('Archivo usuarios creado!');

});




fs.writeFile(path.join(__dirname, "../database/cargos.json"), '{"cargos":[]}', function (err) {

    if (err) throw err;

    console.log('Archivo cargos creado!');

});




fs.writeFile(path.join(__dirname, "../database/roles.json"), '{"roles":[]}', function (err) {

    if (err) throw err;

    console.log('Archivo roles creado!');

});




fs.writeFile(path.join(__dirname, "../database/horarios.json"), '{"horarios":[]}', function (err) {

    if (err) throw err;

    console.log('Archivo horarios creado!');

});




fs.writeFile(path.join(__dirname, "../database/coordinaciones.json"), '{"coordinaciones":[]}', function (err) {

    if (err) throw err;

    console.log('Archivo coordinaciones creado!');

});




fs.writeFile(path.join(__dirname, "../database/ausencias.json"), '{"ausencias":[]}', function (err) {

    if (err) throw err;

    console.log('Archivo ausencias creado!');

});




fs.writeFile(path.join(__dirname, "../database/seguimiento_horarios.json"), '{"seguimiento_horarios":[]}', function (err) {

    if (err) throw err;

    console.log('Archivo seguimiento_horarios creado!');

});




fs.writeFile(path.join(__dirname, "../database/usuarios_actividades.json"), '{"usuarios_actividades":[]}', function (err) {

    if (err) throw err;

    console.log('Archivo usuarios_actividades creado!');

});




fs.writeFile(path.join(__dirname, "../database/actividades.json"), '{"actividades":[]}', function (err) {

    if (err) throw err;

    console.log('Archivo actividades creado!');

});




fs.writeFile(path.join(__dirname, "../database/actividades_coordinaciones.json"), '{"actividades_coordinaciones":[]}', function (err) {

    if (err) throw err;

    console.log('Archivo actividades_coordinaciones creado!');

});
