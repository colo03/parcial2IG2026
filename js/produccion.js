let nombres = [];
let personasPorInstalacion = [];
let diasPorInstalacion = [];

let cantidadInstalaciones = 0;
let horasPorDia = 0;
let honorarioPorHora = 0;

let cargadas = 0;

let formConfig = document.querySelector("#formConfig");
let fieldConfig = document.querySelector("#fieldConfig");
let msjConfig = document.querySelector("#msjConfig");

let formInstalacion = document.querySelector("#formInstalacion");
let fieldInstalacion = document.querySelector("#fieldInstalacion");
let msjInstalacion = document.querySelector("#msjInstalacion");
let progresoCarga = document.querySelector("#progresoCarga");

let btnCalcular = document.querySelector("#btnCalcular");
let btnReiniciar = document.querySelector("#btnReiniciar");
let resultados = document.querySelector("#resultados");



// Devuelve true si el número es un entero mayor que 0
function esEnteroPositivo(numero) {
    if (isNaN(numero)) {
        return false;
    }
    if (numero <= 0) {
        return false;
    }
    if (numero !== Math.floor(numero)) {
        return false;
    }
    return true;
}

// Calcula el costo total de producir una instalacion 
function calcularCostoInstalacion(personas, dias) {
    return personas * dias * horasPorDia * honorarioPorHora;
}


formConfig.addEventListener("submit", function (evento) {
    // evitamos que el formulario recargue la página
    evento.preventDefault();

    let cantidad = Number(document.querySelector("#cantidadInstalaciones").value);
    let horas = Number(document.querySelector("#horasPorDia").value);
    let honorario = Number(document.querySelector("#honorarioPorHora").value);

    // validamos todos los datos
    if (!esEnteroPositivo(cantidad)) {
        msjConfig.innerText = "La cantidad de instalaciones debe ser un número entero mayor a 0.";
        return;
    }
    if (!esEnteroPositivo(horas) || horas > 24) {
        msjConfig.innerText = "Las horas por día deben ser un número entero entre 1 y 24.";
        return;
    }
    if (isNaN(honorario) || honorario <= 0) {
        msjConfig.innerText = "El honorario por hora debe ser un número mayor a 0.";
        return;
    }

    // si los datos son válidos, los guardamos en las variables globales
    cantidadInstalaciones = cantidad;
    horasPorDia = horas;
    honorarioPorHora = honorario;
    msjConfig.innerText = "";

    // deshabilitamos el paso 1 y habilitamos el paso 2
    fieldConfig.disabled = true;
    fieldInstalacion.disabled = false;

    // mostramos el progreso de la carga
    progresoCarga.innerText = "Cargá la instalación 1 de " + cantidadInstalaciones + ".";
});


formInstalacion.addEventListener("submit", function (evento) {
    // evitamos que el formulario recargue la página
    evento.preventDefault();

    // capturamos los datos de la instalación
    let nombre = document.querySelector("#nombreInstalacion").value;
    let personas = Number(document.querySelector("#personas").value);
    let dias = Number(document.querySelector("#dias").value);

    // validamos todos los datos
    if (nombre === "") {
        msjInstalacion.innerText = "El nombre de la instalación no puede estar vacío.";
        return;
    }
    if (!esEnteroPositivo(personas)) {
        msjInstalacion.innerText = "La cantidad de personas debe ser un número entero mayor a 0.";
        return;
    }
    if (!esEnteroPositivo(dias)) {
        msjInstalacion.innerText = "Los días de producción deben ser un número entero mayor a 0.";
        return;
    }

    // si los datos son válidos, los agregamos a los arrays
    nombres.push(nombre);
    personasPorInstalacion.push(personas);
    diasPorInstalacion.push(dias);
    cargadas = cargadas + 1;
    msjInstalacion.innerText = "";

    // limpiamos los campos del formulario para la próxima carga
    formInstalacion.reset();

    // controlamos si ya terminamos de cargar todas las instalaciones
    if (cargadas === cantidadInstalaciones) {
        // deshabilitamos la carga y habilitamos el cálculo
        fieldInstalacion.disabled = true;
        btnCalcular.disabled = false;
        progresoCarga.innerText = "Carga completa: se cargaron las " + cantidadInstalaciones +
            " instalaciones. Ya podés calcular los resultados.";
    } else {
        // todavía faltan instalaciones por cargar
        progresoCarga.innerText = "Instalación " + cargadas + " cargada. Cargá la instalación " +
            (cargadas + 1) + " de " + cantidadInstalaciones + ".";
    }
});


//calculo de resultados

btnCalcular.addEventListener("click", function () {

    //costo total
    let totalPersonas = 0;
    for (let i = 0; i < personasPorInstalacion.length; i++) {
        totalPersonas = totalPersonas + personasPorInstalacion[i];
    }
    let costoDia = totalPersonas * horasPorDia * honorarioPorHora;

    //instalacion con mas dias
    let indiceMax = 0;
    for (let i = 1; i < diasPorInstalacion.length; i++) {
        if (diasPorInstalacion[i] > diasPorInstalacion[indiceMax]) {
            indiceMax = i;
        }
    }
    let costoInstalacionMax = calcularCostoInstalacion(personasPorInstalacion[indiceMax], diasPorInstalacion[indiceMax]);

    //porcentajes
    let costoTotalEstudio = 0;
    for (let i = 0; i < nombres.length; i++) {
        costoTotalEstudio = costoTotalEstudio + calcularCostoInstalacion(personasPorInstalacion[i], diasPorInstalacion[i]);
    }
    let porcentaje = (costoInstalacionMax / costoTotalEstudio) * 100;
   
    porcentaje = Math.round(porcentaje * 100) / 100;

    // resultados
    let salida = "<h3>Resultados</h3>";
    salida += "<p>1. El costo total de un día de trabajo, considerando el total de " + totalPersonas +
        " personas del estudio, es de <span class='valor'>$" + costoDia + "</span>.</p>";
    salida += "<p>2. La instalación que necesita más días de producción es <span class='valor'>" +
        nombres[indiceMax] + "</span>, con " + diasPorInstalacion[indiceMax] +
        " días. Su costo total de producción es de <span class='valor'>$" + costoInstalacionMax + "</span>.</p>";
    salida += "<p>3. El costo de esa instalación representa un <span class='valor'>" + porcentaje +
        "%</span> del costo total del estudio, que es de $" + costoTotalEstudio + ".</p>";
    resultados.innerHTML = salida;

    // deshabilitamos el cálculo y habilitamos el reinicio
    btnCalcular.disabled = true;
    btnReiniciar.disabled = false;
});



btnReiniciar.addEventListener("click", function () {
    // reset de arrays y vars
    nombres = [];
    personasPorInstalacion = [];
    diasPorInstalacion = [];
    cantidadInstalaciones = 0;
    horasPorDia = 0;
    honorarioPorHora = 0;
    cargadas = 0;

    formConfig.reset();
    formInstalacion.reset();
    msjConfig.innerText = "";
    msjInstalacion.innerText = "";
    progresoCarga.innerText = "";
    resultados.innerHTML = "";

    fieldConfig.disabled = false;
    fieldInstalacion.disabled = true;
    btnCalcular.disabled = true;
    btnReiniciar.disabled = true;
});
