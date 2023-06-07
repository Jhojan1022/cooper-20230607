const actividadesModel = require("../models/actividadesModel");
const actividadesController = require("../controllers/actividadesController")
const coordinacionesModel = require("../models/coordinacionesModel");
const cargosModel = require("../models/cargosModel");
const horariosModel = require("../models/horariosModel");

async function informesView(req, res) {
    let actividades = await actividadesModel.getAllActivities(),
        coordinacionesM = await coordinacionesModel.getCoordinaciones();

    actividades.map(act => {
        coordinacionesM.coordinaciones.map(coor => {
            if (act.area == coor.id_coordinacion) {
                act.nombre_area = coor.nombre_coordinacion
            }
        })
    })
    // console.log("actividades")
    // console.log(actividades)

    res.render("layouts/informes", {
        actividadesC: actividades
    })
}

module.exports = {
    informesView
}