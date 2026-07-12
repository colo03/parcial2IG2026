let instalaciones = [];

let cantidadInstalaciones = 0;
let horasPorDia = 0;
let honorarioPorHora = 0;

let formConfig = document.querySelector("#formConfig");
let fieldConfig = document.querySelector("#fieldConfig");
let msjConfig = document.querySelector("#msjConfig");
let inputCantidad = document.querySelector("#cantidadInstalaciones");
let inputHoras = document.querySelector("#horasPorDia");
let inputHonorario = document.querySelector("#honorarioPorHora");

let formInstalacion = document.querySelector("#formInstalacion");
let fieldInstalacion = document.querySelector("#fieldInstalacion");
let msjInstalacion = document.querySelector("#msjInstalacion");
let progresoCarga = document.querySelector("#progresoCarga");
let inputNombre = document.querySelector("#nombreInstalacion");
let inputPersonas = document.querySelector("#personas");
let inputDias = document.querySelector("#dias");

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

    let cantidad = Number(inputCantidad.value);
    let horas = Number(inputHoras.value);
    let honorario = Number(inputHonorario.value);

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
    let nombre = inputNombre.value;
    let personas = Number(inputPersonas.value);
    let dias = Number(inputDias.value);

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

    // si los datos son válidos, creamos un objeto y lo agregamos al array
    const nuevaInstalacion = {
        nombre: nombre,
        personas: personas,
        dias: dias
    };
    instalaciones.push(nuevaInstalacion);
    msjInstalacion.innerText = "";

    // limpiamos los campos del formulario para la próxima carga
    formInstalacion.reset();

    // controlamos si ya terminamos de cargar todas las instalaciones
    if (instalaciones.length === cantidadInstalaciones) {
        // deshabilitamos la carga y habilitamos el cálculo
        fieldInstalacion.disabled = true;
        btnCalcular.disabled = false;
        progresoCarga.innerText = "Carga completa: se cargaron las " + cantidadInstalaciones +
            " instalaciones. Ya podés calcular los resultados.";
    } else {
        // todavía faltan instalaciones por cargar
        progresoCarga.innerText = "Instalación " + instalaciones.length + " cargada. Cargá la instalación " +
            (instalaciones.length + 1) + " de " + cantidadInstalaciones + ".";
    }
});


//calculo de resultados

function calcularYMostrarResultados() {
    //costo total de un día: sumamos el total de personas del estudio recorriendo el array con for
    let totalPersonas = 0;
    for (let i = 0; i < instalaciones.length; i++) {
        totalPersonas = totalPersonas + instalaciones[i].personas;
    }
    let costoDia = totalPersonas * horasPorDia * honorarioPorHora;

    //instalacion con mas dias
    let instalacionMaxDias = instalaciones[0];
    for (let i = 1; i < instalaciones.length; i++) {
        if (instalaciones[i].dias > instalacionMaxDias.dias) {
            instalacionMaxDias = instalaciones[i];
        }
    }
    let costoInstalacionMax = calcularCostoInstalacion(instalacionMaxDias.personas, instalacionMaxDias.dias);

    //se suma el costo total de cada instalacion
    let costoTotalEstudio = 0;
    for (let i = 0; i < instalaciones.length; i++) {
        costoTotalEstudio = costoTotalEstudio + calcularCostoInstalacion(instalaciones[i].personas, instalaciones[i].dias);
    }

    //porcentaje que representa la instalación de más días
    let porcentaje = (costoInstalacionMax / costoTotalEstudio) * 100;
    porcentaje = Math.round(porcentaje * 100) / 100;

    // resultados
    let salida = "<h3>Resultados</h3>";
    salida += "<p>1. El costo total de un día de trabajo, considerando el total de " + totalPersonas +
        " personas del estudio, es de <span class='valor'>$" + costoDia + "</span>.</p>";
    salida += "<p>2. La instalación que necesita más días de producción es <span class='valor'>" +
        instalacionMaxDias.nombre + "</span>, con " + instalacionMaxDias.dias +
        " días. Su costo total de producción es de <span class='valor'>$" + costoInstalacionMax + "</span>.</p>";
    salida += "<p>3. El costo de esa instalación representa un <span class='valor'>" + porcentaje +
        "%</span> del costo total del estudio, que es de $" + costoTotalEstudio + ".</p>";
    resultados.innerHTML = salida;

    // deshabilitamos el cálculo y habilitamos el reinicio
    btnCalcular.disabled = true;
    btnReiniciar.disabled = false;
}

btnCalcular.addEventListener("click", calcularYMostrarResultados);


btnReiniciar.addEventListener("click", function () {
    // reset de arrays y vars
    instalaciones = [];
    cantidadInstalaciones = 0;
    horasPorDia = 0;
    honorarioPorHora = 0;

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
