const actividadesModel = require("../models/actividadesModel");
const actividadesController = require("../controllers/actividadesController")
const coordinacionesModel = require("../models/coordinacionesModel");
const cargosModel = require("../models/cargosModel");
const horariosModel = require("../models/horariosModel");

async function miRendimientoView(req, res) {
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

    // actividades completas

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
    actividadesCompletas = actividadesCompletas.filter((actividad) => actividad.usuario == req.session.user.id_usuario);

    actividadesCompletas.sort(function (a, b) {
        var fechaInicioA = new Date(a.fecha_fin);
        var fechaInicioB = new Date(b.fecha_fin);
        return fechaInicioA - fechaInicioB;
    });

    console.log("Actividades rendimiento");
    console.log(actividadesCompletas)


    res.render("layouts/mi_rendimiento",
        {
            user: req.session.user,
            estadoHorario: horarioUsuario[horarioUsuario.length - 1],
            actividades: actividadesCompletas
        }
    )
}

module.exports = {
    miRendimientoView
}