let actividades = document.getElementById("contActividades").textContent;
actividades = JSON.parse(actividades)

function bdactividades() {
    // Objeto para almacenar las sumas acumulativas por ID de actividad
    let duracionPorActividad = {};

    actividades.forEach(actividad => {
        if (actividad.fecha_fin !== '') {
            let fechaInicio = new Date(actividad.fecha_inicio);
            let fechaFin = new Date(actividad.fecha_fin);

            let tiempoPasadoEnMilisegundos = fechaFin - fechaInicio;
            let segundosTotales = tiempoPasadoEnMilisegundos / 1000;

            let horas = Math.floor(segundosTotales / 3600);
            let minutos = Math.floor((segundosTotales % 3600) / 60);
            let segundos = Math.floor(segundosTotales % 60);

            let idActividad = actividad.id_actividad;

            // Si el ID de actividad no existe en el objeto, se crea una nueva entrada con el tiempo actual
            if (!duracionPorActividad[idActividad]) {
                duracionPorActividad[idActividad] = {
                    nom_actividad: actividad.nombre_actividad,
                    horas: horas,
                    minutos: minutos,
                    segundos: segundos
                };
            } else {
                // Si el ID de actividad ya existe en el objeto, se suman los tiempos acumulativos
                duracionPorActividad[idActividad].horas += horas;
                duracionPorActividad[idActividad].minutos += minutos;
                duracionPorActividad[idActividad].segundos += segundos;
            }
        }
    });

    //console.log(duracionPorActividad);
    return duracionPorActividad
}

function grafrendtiempoin() {
    // Obtén el contexto del lienzo
    var ctx = document.getElementById('gfcotiempoact').getContext('2d');
    let dataACT = bdactividades();
    let labelstmp = [];
    let datatmp = [];

    for (let actividadId in dataACT) {
        if (dataACT.hasOwnProperty(actividadId)) {
            let duracion = dataACT[actividadId];
            let nomActividad = duracion.nom_actividad;
            let horas = duracion.horas;
            let minutos = duracion.minutos;
            let segundos = duracion.segundos;
            labelstmp.push(nomActividad)
            datatmp.push(horas)

            console.log(`Actividad ${actividadId}: ${horas} horas, ${minutos} minutos, ${segundos} segundos - ${nomActividad}`);
        }
    }

    console.log(datatmp)


    // Datos para el gráfico
    var data = {
        labels: labelstmp,
        datasets: [{
            label: 'Cantidad de horas por actividad',
            data: datatmp,
            backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color de fondo de las barras
            borderColor: 'rgba(0, 123, 255, 1)', // Color del borde de las barras
            borderWidth: 1 // Ancho del borde de las barras
        }]
    };

    // Configuración del gráfico
    var options = {
        responsive: true, // Hace que el gráfico se ajuste al tamaño del contenedor
        scales: {
            y: {
                beginAtZero: true // Inicia el eje Y desde cero
            }
        }
    };

    // Crea el gráfico
    var myChart = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico (barras en este caso)
        data: data,
        options: options
    });
}

grafrendtiempoin()
bdactividades()