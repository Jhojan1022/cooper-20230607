const actividadesModel = require("../models/actividadesModel");
const actividadesController = require("../controllers/actividadesController")
const coordinacionesModel = require("../models/coordinacionesModel");
const cargosModel = require("../models/cargosModel");
const horariosModel = require("../models/horariosModel");

async function informesView(req, res) {
    let actividades = await actividadesModel.getAllActivities(),
        coordinacionesM = await coordinacionesModel.getCoordinaciones(),
        actividadesAll = await actividadesModel.getActivities();
        console.log("Actividades informes view")
        console.log(actividades)
        console.log(actividadesAll)


    actividades.map(act => {
        coordinacionesM.coordinaciones.map(coor => {
            if (act.area == coor.id_coordinacion) {
                act.nombre_area = coor.nombre_coordinacion
            }
        })

        actividadesAll.actividades.map(act2 => {
            if (act.id_actividad == act2.id_actividad){
                act.nombre_actividad = act2.nombre_actividad;
            }
        })
    })


    res.render("layouts/informes", {
        actividadesC: actividades
    })
}

module.exports = {
    informesView
}