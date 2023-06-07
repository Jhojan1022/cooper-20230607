
function validacionesMiactividad() {

    // inactividad por mas de 12 horas
    let rfechaIngreso = duracionActividad(userD.fechaIngreso, undefined);
    console.log(rfechaIngreso)

    if (rfechaIngreso.horas > 12 && userD.fechaSalida == '') {
        alert("Se ha detectado que ha transcurrido un periodo de más de 12 horas desde su último ingreso. En consecuencia, el seguimiento de su último registro de ingreso se cerrará y se considerará un lapso de 12 horas en el cálculo de su horario laboral, así como en el seguimiento de sus actividades activas.")

        let fechaActual = new Date(userD.fechaIngreso)

        fechaActual.setHours(fechaActual.getHours() + 12)

        fechaActual = fechaActual.getFullYear().toString().padStart(4, '0') + "-" +
            (fechaActual.getMonth() + 1).toString().padStart(2, '0') + "-" +
            fechaActual.getDate().toString().padStart(2, '0') + ' ' + fechaActual.getHours().toString().padStart(2, '0') + ':' +
            fechaActual.getMinutes().toString().padStart(2, '0') + ':' + fechaActual.getSeconds().toString().padStart(2, '0');

        fetch("/cerrarActividades", {
            method: 'POST',
            headers:
            {
                fecha_fin: fechaActual
            }
        })
            .then(response => {
                if (response.ok) {
                    // La solicitud se realizó con éxito (código de estado 2xx)
                    //console.log("Solicitud exitosa");
                    //console.log("Estado de respuesta:", response.status);
                    if (response.status == 200) {
                        console.log("Actividades finalizadas por salida laboral")
                    }
                } else {
                    // La solicitud no se pudo completar (código de estado diferente de 2xx)
                    // console.log("La solicitud no se pudo completar");
                    // console.log("Estado de respuesta:", response.status);
                    alert("Ocurrió un error")
                }
            })
            .catch(error => {
                // Error al realizar la solicitud
                console.log("Error al realizar la solicitud:", error);
            });
        window.location.reload()
    }

    const btnIngreso = document.getElementById("ringreso"),
        btnSalida = document.getElementById("rsalida");

    // impedir que se registre un ingreso sin tener una salida
    if (userD.fechaIngreso != '0000-00-00') {
        if (userD.fechaSalida == '' || userD.fechaSalida == undefined) {
            btnIngreso.disabled = true;
            btnIngreso.title = "Registra primero tu salida laboral para registrar el ingreso"
        }
    }

    // Marcación de resalto de dia de ingreso
    let fechaActual = new Date(),
        fechaIngresoF = new Date(userD.fechaIngreso),
        divIngreso = document.getElementById("ingreso");

    if (fechaActual.getDay() === fechaIngresoF.getDay()){
        divIngreso.innerHTML += " (Hoy)"
    }else{
        divIngreso.innerHTML += " (Ingreso pendiente hoy)"
    }
}


function registrarIngreso() {
    let fechaActual = new Date();
    let idUsuario = userD.id_usuario; // Almacenar el valor en una variable local


    const data = {
        fecha_ingreso: fechaActual.getFullYear().toString().padStart(4, '0') + "-" +
            (fechaActual.getMonth() + 1).toString().padStart(2, '0') + "-" +
            fechaActual.getDate().toString().padStart(2, '0') + ' ' + fechaActual.getHours().toString().padStart(2, '0') + ':' +
            fechaActual.getMinutes().toString().padStart(2, '0'),
        fecha_salida: "",
        usuario: idUsuario // 'JT22859' // Usar la variable local en lugar de acceder directamente a userD.id_usuario
    };

    fetch("/ingresoLaboral", {
        method: 'POST',
        headers: data
    })
        .then(response => {
            if (response.ok) {
                // La solicitud se realizó con éxito (código de estado 2xx)
                //console.log("Solicitud exitosa");
                //console.log("Estado de respuesta:", response.status);
                if (response.status == 200) {
                    alert("Registro de ingreso laboral registrado existosamente")
                }
            } else {
                // La solicitud no se pudo completar (código de estado diferente de 2xx)
                // console.log("La solicitud no se pudo completar");
                // console.log("Estado de respuesta:", response.status);
                alert("Ocurrió un error")
            }
        })
        .catch(error => {
            // Error al realizar la solicitud
            console.log("Error al realizar la solicitud:", error);
        });
    window.location.reload()
}


function registrarSalida() {
    //validaciones
    if (confirm("Al registrar la salida laboral, se procederá al cierre automático de todas las actividades activas que coincidan en fecha y hora con el momento del registro.")) {

        let fechaActual = new Date()

        fechaActual = fechaActual.getFullYear().toString().padStart(4, '0') + "-" +
            (fechaActual.getMonth() + 1).toString().padStart(2, '0') + "-" +
            fechaActual.getDate().toString().padStart(2, '0') + ' ' + fechaActual.getHours().toString().padStart(2, '0') + ':' +
            fechaActual.getMinutes().toString().padStart(2, '0') + ':' + fechaActual.getSeconds().toString().padStart(2, '0');

        fetch("/cerrarActividades", {
            method: 'POST',
            headers:
            {
                fecha_fin: fechaActual
            }
        })
            .then(response => {
                if (response.ok) {
                    // La solicitud se realizó con éxito (código de estado 2xx)
                    //console.log("Solicitud exitosa");
                    //console.log("Estado de respuesta:", response.status);
                    if (response.status == 200) {
                        alert("Actividades finalizadas por lapso mayor a 12 horas")
                    }
                } else {
                    // La solicitud no se pudo completar (código de estado diferente de 2xx)
                    // console.log("La solicitud no se pudo completar");
                    // console.log("Estado de respuesta:", response.status);
                    alert("Ocurrió un error")
                }
            })
            .catch(error => {
                // Error al realizar la solicitud
                console.log("Error al realizar la solicitud:", error);
            });
        window.location.reload()
    }

    const fechaActual = new Date()

    const fecha_salidaC = fechaActual.getFullYear().toString().padStart(4, '0') + "-" +
        (fechaActual.getMonth() + 1).toString().padStart(2, '0') + "-" +
        fechaActual.getDate().toString().padStart(2, '0') + ' ' + fechaActual.getHours().toString().padStart(2, '0') + ':' +
        fechaActual.getMinutes().toString().padStart(2, '0');

    fetch("/salidaLaboral", {
        method: 'POST',
        headers: {
            fecha_salida: fecha_salidaC
        }
    })
        .then(response => {
            if (response.ok) {
                if (response.status == 200) {
                    alert("Salida laboral registrado existosamente")
                }
            } else {
                alert("Ocurrió un error")
            }
        })
        .catch(error => {
            console.log("Error al realizar la solicitud:", error);
        });
    window.location.reload()
}

function iniciarActividad() {
    //validaciones
    if (userD.fechaSalida == '') {
        if (confirm("¿Está segur@ de iniciar esta actividad?")) {
            let fechaActual = new Date()

            fechaActual = fechaActual.getFullYear().toString().padStart(4, '0') + "-" +
                (fechaActual.getMonth() + 1).toString().padStart(2, '0') + "-" +
                fechaActual.getDate().toString().padStart(2, '0') + ' ' + fechaActual.getHours().toString().padStart(2, '0') + ':' +
                fechaActual.getMinutes().toString().padStart(2, '0') + ':' + fechaActual.getSeconds().toString().padStart(2, '0');

            let areaS = document.getElementById("area"),
                cargoS = document.getElementById("cargo"),
                actividadS = document.getElementById("actividad"),
                observacionS = document.getElementById("observaciones")

            let data = {
                area: areaS.value,
                cargo: cargoS.value,
                actividad: actividadS.value,
                observacion1: observacionS.value,
                observacion2: "",
                fecha_inicio: fechaActual
            }

            fetch("/iniciarActividad", {
                method: 'POST',
                headers: data
            })
                .then(response => {
                    if (response.ok) {
                        if (response.status == 200) {
                            alert("Actividad registrada existosamente")
                        } else {
                            alert("Ya se inició esta actividad")
                        }
                    } else {
                        alert("Ocurrió un error")
                    }
                })
                .catch(error => {
                    console.log("Error al realizar la solicitud:", error);
                });
            window.location.reload()
        }
    } else {
        alert("No ha registrado su ingreso laboral")
    }
}


function duracionActividad(act, obj) {
    // Convertir la fecha act a un objeto de fecha
    const fechaActividad = new Date(act);

    // Obtener la hora actual
    const fechaActual = new Date();

    // Calcular la diferencia de tiempo en milisegundos
    const duracionMilisegundos = fechaActual - fechaActividad;

    // Calcular la duración en horas, minutos y segundos
    const duracionHoras = Math.floor(duracionMilisegundos / (1000 * 60 * 60));
    const duracionMinutos = Math.floor((duracionMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
    const duracionSegundos = Math.floor((duracionMilisegundos % (1000 * 60)) / 1000);

    // Construir la representación de la duración
    const duracion = duracionHoras + " horas, " + duracionMinutos + " minutos y " + duracionSegundos + " segundos";
    if (document.getElementById("timer" + obj)) {
        document.getElementById("timer" + obj).innerHTML = duracion;
    }
    return {
        horas: duracionHoras,
        minutos: duracionMinutos,
        segundos: duracionSegundos
    }
}

function finalizarActividad(a) {
    let html = `
    <form>
    <label for="observacion2">¿Cómo te fue con la actividad?</label>
    <br><br><br>
    <textarea name="observacion2" id="observacion2t" cols="30" rows="10"></textarea>
    <br><br><br>
    <button onclick="window.modal.close()" class="sendform">Cerrar</button>
    <button class='sendform' id="btn_finalizar_actividad" onclick="">Finalizar actividad</button>
</form>
    `
    document.getElementById("modal").style.height = '40vh'
    dspModal("Finalizar actividad", html)

    let observacion2 = document.getElementById("observacion2t")
    console.log("texttarea")
    console.log(observacion2.value)
    let fechaActual = new Date()

    fechaActual = fechaActual.getFullYear().toString().padStart(4, '0') + "-" +
        (fechaActual.getMonth() + 1).toString().padStart(2, '0') + "-" +
        fechaActual.getDate().toString().padStart(2, '0') + ' ' + fechaActual.getHours().toString().padStart(2, '0') + ':' +
        fechaActual.getMinutes().toString().padStart(2, '0') + ':' + fechaActual.getSeconds().toString().padStart(2, '0');

    let data = {
        id_actividad: a,
        observacion2: observacion2.value,
        fecha_fin: fechaActual
    }

    document.getElementById("btn_finalizar_actividad").addEventListener("click", () => {
        data.observacion2 = observacion2.value;
        if (confirm("Está segur@ que desea finalizar la actividad")) {
            fetch("/finalizarActividad", {
                method: 'POST',
                headers: data
            })
                .then(response => {
                    if (response.ok) {
                        if (response.status == 200) {
                            alert("Actividad registrada existosamente")
                        }
                    } else {
                        alert("Ocurrió un error")
                    }
                })
                .catch(error => {
                    console.log("Error al realizar la solicitud:", error);
                });
            // window.location.reload()
        } else {
            window.modal.close()
        }
    })
}

validacionesMiactividad()