const actividadesModel = require("../models/actividadesModel");
const actividadesController = require("../controllers/actividadesController")
const coordinacionesModel = require("../models/coordinacionesModel");
const cargosModel = require("../models/cargosModel");
const horariosModel = require("../models/horariosModel");

async function miactividadView(req, res) {
    // coordinaciones por usuario
    let coordinacionesM = await coordinacionesModel.getCoordinaciones();
    coordinacionesM = coordinacionesM.coordinaciones.find((coordinacion) => Number(coordinacion.id_coordinacion) === Number(req.session.user.coordinacion))

    // cargos por usuario
    let cargosM = await cargosModel.getCargos()
    cargosM = cargosM.cargos.find((cargo) => cargo.id_cargo == req.session.user.coordinacion)

    // Horario laboral por usuario
    let horarioUsuario = await horariosModel.estadoHorarioLaboral();
    horarioUsuario = horarioUsuario.seguimiento_horarios.filter((horario) => horario.usuario == req.session.user.id_usuario)
    if (horarioUsuario[horarioUsuario.length - 1] == undefined) {
        horarioUsuario[horarioUsuario.length - 1] = {
            id_seguimiento_horario: 1,
            fecha_ingreso: '0000-00-00',
            fecha_salida: '',
            usuario: req.session.user.id_usuario
        }
    }
    // console.log("usuario para horarior " + req.session.user.id_usuario)
    // console.log(horarioUsuario[horarioUsuario.length - 1])

    // actividades activas
    let actividades = await actividadesModel.getActividadesACT();
    let actividadesList = await actividadesController.getActivitiesUser(req.session.user);

    let actividadesCompletas = [];

    actividades.usuarios_actividades.filter((actividad) => actividad.usuario == req.session.user.id_usuario
        && actividad.fecha_fin == ''
    )

    actividades.usuarios_actividades.map((act) => {
        actividadesList.map((actividad) => {
            if (act.actividad == actividad.id_actividad) {
                actividadesCompletas.push({ ...act, ...actividad })
            }
        })
    })
    actividadesCompletas = actividadesCompletas.filter((actividad) => actividad.usuario == req.session.user.id_usuario && actividad.fecha_fin == '')


    res.render("layouts/mi_actividad", {
        actividadesM: await actividadesController.getActivitiesUser(req.session.user),
        user: req.session.user,
        coordinacionesM: coordinacionesM,
        cargos: cargosM,
        estadoHorario: horarioUsuario[horarioUsuario.length - 1],
        actividadesACT: actividadesCompletas
    });
}

module.exports = {
    miactividadView
}