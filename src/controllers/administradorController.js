const rolesModel = require("../models/rolesModel"),
    cargosModel = require("../models/cargosModel"),
    coordinacionesModel = require("../models/coordinacionesModel"),
    horariosModel = require("../models/horariosModel"),
    usuariosModel = require("../models/usuariosModel")

async function adminstradorView(req, res) {
    res.render("layouts/administrador", {
        roles: await rolesModel.getRoles(),
        cargos: await cargosModel.getCargos(),
        coordinaciones: await coordinacionesModel.getCoordinaciones(),
        horarios: await horariosModel.getHorarios(),
        usuariosM: await usuariosModel.getUsersADM()
    })
}

module.exports = {
    adminstradorView
}