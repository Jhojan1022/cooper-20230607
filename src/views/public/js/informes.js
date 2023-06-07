const filterGraficSelect = document.getElementById("filterGrafic");
const ctx = document.getElementById("actarea").getContext('2d');
const ctx2 =document.getElementById("acttime").getContext('2d');
let coortmp = JSON.parse(document.getElementById("coortmp").textContent);

console.log(coortmp);

// Configuración de los gráficos (responsive)
const options = {
    responsive: true, // Hace que el gráfico se ajuste al tamaño del contenedor
    scales: {
        y: {
            beginAtZero: true // Inicia el eje Y desde cero
        }
    }
};

let myChart,
myChart2// Declarar la variable myChart fuera de la función

function graficActivArea() {
    let duracionArea = {};
    let l = [];
    let d = [];

    coortmp.forEach(actividad => {
        if (actividad.fecha_fin !== '') {
            let fechaInicio = new Date(actividad.fecha_inicio);
            let fechaFin = new Date(actividad.fecha_fin);

            let tiempoPasadoEnMilisegundos = fechaFin - fechaInicio;
            let segundosTotales = tiempoPasadoEnMilisegundos / 1000;

            let horas = Math.floor(segundosTotales / 3600);
            let minutos = Math.floor((segundosTotales % 3600) / 60);
            let segundos = Math.floor(segundosTotales % 60);

            let idCoor = actividad.area;

            // Si el ID de actividad no existe en el objeto, se crea una nueva entrada con el tiempo actual
            if (!duracionArea[idCoor]) {
                duracionArea[idCoor] = {
                    nom_area: actividad.nombre_area,
                    horas: horas,
                    minutos: minutos,
                    segundos: segundos
                };
            } else {
                // Si el ID de actividad ya existe en el objeto, se suman los tiempos acumulativos
                duracionArea[idCoor].horas += horas;
                duracionArea[idCoor].minutos += minutos;
                duracionArea[idCoor].segundos += segundos;
            }
        }
    });

    console.log("duracion por area");
    console.log(duracionArea);

    for (let Id in duracionArea) {
        if (duracionArea.hasOwnProperty(Id)) {
            let duracion = duracionArea[Id];
            let nomCoor = duracion.nom_area;
            let horas = duracion.horas;
            let minutos = duracion.minutos;
            let segundos = duracion.segundos;
            l.push(nomCoor);
            d.push(horas);

            console.log(`Actividad ${Id}: ${horas} horas, ${minutos} minutos, ${segundos} segundos - ${nomCoor}`);
        }
    }

    var data = {
        labels: l,
        datasets: [{
            label: 'Cantidad de horas por área',
            data: d,
            backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color de fondo de las barras
            borderColor: 'rgba(0, 123, 255, 1)', // Color del borde de las barras
            borderWidth: 1 // Ancho del borde de las barras
        }]
    };

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico (barras en este caso)
        data: data,
        options: options
    });
}

//

function grafTiempoAct() {
    var data = {
        labels: ["actividad1", "actividad2", "actividad3", "actividad4",],
        datasets: [{
            label: 'Cantidad de horas por actividad',
            data: [3, 5, 2, 7],
            backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color de fondo de las barras
            borderColor: 'rgba(0, 123, 255, 1)', // Color del borde de las barras
            borderWidth: 1 // Ancho del borde de las barras
        }]
    };

    if (myChart2) {
        myChart.destroy();
    }

    myChart2 = new Chart(ctx2, {
        type: 'line', // Tipo de gráfico (barras en este caso)
        data: data,
        options: options
    });
}
//

let c = 0;

filterGraficSelect.addEventListener("change", () => {
    let tmp = [];
    if (filterGraficSelect.value == 0){
        c = 0
    }else{
        c = 1
    }

    if (c == 0) {
        let fechaActual = new Date();

        coortmp.forEach(coor => {
            let fechaInicio = new Date(coor.fecha_inicio);

            if (
                fechaInicio.getFullYear() === fechaActual.getFullYear() &&
                fechaInicio.getMonth() === fechaActual.getMonth() &&
                fechaInicio.getDate() === fechaActual.getDate()
            ) {
                tmp.push({ ...coor });
            }
        });

        coortmp = tmp;

        console.log("coortmp filtrado");
        console.log(coortmp);

        graficActivArea();
        c = 1;
    } else {
        coortmp = JSON.parse(document.getElementById("coortmp").textContent);
        graficActivArea();
        c = 0;
    }
});


graficActivArea()
grafTiempoAct()
