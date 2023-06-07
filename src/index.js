const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
let morgan = require("morgan")
let usuariosController = require("./controllers/usuarios")
let miactividadController = require("./controllers/miactividadController")
let actividadesController = require("./controllers/actividadesController")
let horariosController = require("./controllers/horariosController")
let mirendimientoController = require("./controllers/mirendimientoController")
let informesController = require("./controllers/informesController")

let app = express();

const port = 9000;

// sessiones

//app.use(cookieParser());

app.use(session({
    secret: 'colfondos',
    resave: false,
    saveUninitialized: false
}));


// Motores de vistas

app.set("view engine", "ejs")
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views/public'));

app.use(morgan('combined'))


function logger(req, res, next) {
    // console.log("Filtro de login");
    next()
}

app.use(logger)

// Rutas
// Get

app.get("/login", usuariosController.loginView)
app.all("/validationLogin", usuariosController.login)
app.get("/", usuariosController.usuarios)

app.get("/mi_actividad", miactividadController.miactividadView)
app.get("/administrador", (req, res) => { res.render("layouts/administrador") })
app.get("/getActivities", actividadesController.getActividades)
app.get("/miRendimiento", mirendimientoController.miRendimientoView)
app.get("/informes", informesController.informesView)


// Post
app.all("/createUser", usuariosController.createUser);
app.all("/ingresoLaboral", horariosController.registrarIngreso);
app.all("/salidaLaboral", horariosController.registrarSalida);
app.all("/iniciarActividad", actividadesController.iniciarActividad);
app.all("/finalizarActividad", actividadesController.finalizarActividad);
app.all("/cerrarActividades", actividadesController.cerrarActividades);

const server = app.listen(process.env.PORT, () => {
    server.timeout = 30000; // Establece el tiempo de espera a 30 segundos
    console.log("Servidor en puerto " + process.env.PORT);
  });
