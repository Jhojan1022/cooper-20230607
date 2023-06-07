const actividadesModel = require("../models/actividadesModel");

const usuariosModel = require("../models/usuariosModel");




async function getActividades(req, res) {
    //let actividadesM = JSON.parse(await actividadesModel.getActivities())
    //console.log(actividadesM.actividades)
    res.send("Actividades")
}

async function getActivitiesUser(s) {
    let user = s;
    return new Promise(async (resolve, reject) => {
        let actividadesM = await actividadesModel.getActivities(); // Obtener las actividades
        let activitiesCoord = await actividadesModel.getActivitiesCoordinacion(); // Obtener las coordinaciones de actividades

        const actCoord = activitiesCoord.actividades_coordinaciones.map((actividadC) => {
            return actividadesM.actividades.find((actividad) => actividad.id_actividad === actividadC.actividades_id_actividad
                && Number(actividadC.coordinaciones_id_coordinacion) == s.coordinacion)
        });

        const actividadesFiltradas = actCoord.filter((actividad) => actividad !== undefined);
        // const act = actividadesM.actividades.find((actividad) => actividad.id_actividad === 1)
        resolve(actividadesFiltradas);
    });
}

async function getActividadesACT(req, res) {
    let actividades = await actividadesModel.getActividadesACT();
    // console.log(actividades)
}

function iniciarActividad(req, res) {
    let data = {
        area: req.headers.area,
        cargo: req.headers.cargo,
        actividad: req.headers.actividad,
        observacion1: req.headers.observacion1,
        observacion2: "",
        fecha_inicio: req.headers.fecha_inicio,
        fecha_fin: "",
        usuario: req.session.user.id_usuario
    }

    actividadesModel.iniciarActividad(data)
    res.status(200).send("OK");
}

function finalizarActividad(req, res) {
    let data = {
        fecha_fin: req.headers.fecha_fin,
        id_actividad: req.headers.id_actividad,
        observacion2: req.headers.observacion2,
        usuario: req.session.user.id_usuario
    }
    actividadesModel.finalizarActividad(data)
    res.status(200).send("OK");
}

function cerrarActividades(req, res) {
    actividadesModel.cerrarActividades(
        {
            usuario: req.session.user.id_usuario,
            fecha_fin: req.headers.fecha_fin
        }
    )
    res.status(200).send("OK");
}

module.exports = {
    getActividades,
    getActivitiesUser,
    iniciarActividad,
    getActividadesACT,
    finalizarActividad,
    cerrarActividades
}