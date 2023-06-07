const horariosModel = require("../models/horariosModel")

function registrarIngreso(req, res) {
    // const user = req.session.user.id_usuario
    try {
        const data = {
            fecha_ingreso: req.headers.fecha_ingreso,
            fecha_salida: '',
            usuario: req.headers.usuario
        }

        horariosModel.registrarIngreso(data)

        res.status(200).send("OK");
    } catch (error) {
        console.log(error)
    }

}

function registrarSalida(req, res) {
    try {
        const fecha_salida = req.headers.fecha_salida;
        // console.log("fecha salida")
        // console.log(fecha_salida)
        horariosModel.registrarSalida(fecha_salida, req.session.user.id_usuario)
        res.status(200).send("OK");
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registrarIngreso,
    registrarSalida
}