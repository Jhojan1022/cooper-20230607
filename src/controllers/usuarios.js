const usuariosModel = require("../models/usuariosModel");
const bcrypt = require("bcryptjs");
const fs = require("fs")

async function usuarios(req, res) {
    // console.log("VENTANA INDEX ")
    // console.log(await req.session.user)
    res.render("index",
        {
            "user": req.session.user,
            //"actividadesM": await JSON.parse(await actividadesModel.getActivities())
        }
    )

}

function loginView(req, res) {
    req.session.destroy()
    // const status = req.query.status || res.locals.status;
    // console.log("el status es " + status);
    // if (req.session.user) {
    //     console.log("usuario en sesión es", req.session.user);
    // }
    res.render("login", /*{ status }*/);
}

async function login(req, res, next) {
    try {
        let usuarioF = req.headers.soid;
        let usuariosM = JSON.parse(await usuariosModel.getUsers()).usuarios;

        const usuarioBuscado = usuariosM.find(
            (usuario) => usuario.id_usuario === usuarioF
        );

        const coincide = await bcrypt.compare(
            req.headers.password,
            usuarioBuscado.contrasena
        );

        if (coincide) {
            req.session.user = usuarioBuscado;
            // console.log("usuario en sesión es", req.session.user);
            await new Promise((resolve) => {
                req.session.save(resolve); // Guardar la sesión antes de redireccionar
            });
            res.redirect("/");
        } else {
            res.status(401).send("Usuario inválido");
        }
    } catch (error) {
        console.error(error);
        return res.render("login", { status: 500, error: error.message });
    }
}


function createUser(req, res) {

    let {
        id_usuario,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        rol,
        cargo,
        coordinacion,
        horario,
        contrasena
    } = req.headers

    bcrypt.hash(contrasena, 10, (err, hash) => {
        if (err) {
            console.log("Error hasheando:", err);
        } else {
            usuariosModel.agregarUsuario(
                {
                    id_usuario,
                    primer_nombre,
                    segundo_nombre,
                    primer_apellido,
                    segundo_apellido,
                    rol,
                    cargo,
                    coordinacion,
                    horario,
                    "contrasena": hash
                }
            )
        }
    });
    res.send("Contraseña hasheada")

    //console.log(req.headers)

    res.status(200)

}

module.exports = {
    usuarios,
    loginView,
    login,
    createUser
}





