/* =========================================================
   galeria.js
   Funcionalidades de la página Galería:
   1) Generar la galería de obras con JavaScript.
   2) Cambiar el tamaño de las imágenes.
   3) Cambiar el tema de color de la galería.
   4) Mostrar un dato curioso al azar.
   ========================================================= */



let obras = [
    { imagen: "img/atomism.jpg", nombre: "Atomism", anio: 2009 },
    { imagen: "img/insilico.jpg", nombre: "Insilico I", anio: 2018 },
    { imagen: "img/insilico2.jpg", nombre: "Insilico II", anio: 2018 },
    { imagen: "img/insilico3.jpg", nombre: "Insilico III", anio: 2019 },
    { imagen: "img/untiteledfilmstill.jpg", nombre: "Untitled Film Still", anio: 2016 }
];

let galeria = document.querySelector("#galeria");

// Armado de galeria
let contenidoGaleria = "";
for (let i = 0; i < obras.length; i++) {
    contenidoGaleria += "<figure class='obra'>";
    contenidoGaleria += "<img src='" + obras[i].imagen + "' alt='Obra " + obras[i].nombre + " de Casey Reas'>";
    contenidoGaleria += "<figcaption><strong>" + obras[i].nombre + "</strong><br>" + obras[i].anio + "</figcaption>";
    contenidoGaleria += "</figure>";
}

galeria.innerHTML = contenidoGaleria;


//Tamaño de imagenes
let tamanios = ["chico", "mediano", "grande"];
let indiceTamanio = 1; 

let btnTamanio = document.querySelector("#btnTamanio");

btnTamanio.addEventListener("click", function () {
    indiceTamanio = indiceTamanio + 1;
    if (indiceTamanio >= tamanios.length) {
        indiceTamanio = 0;
    }
    aplicarTamanio();
});

// Función que aplica el tamaño elegido a todas las imágenes de la galería
function aplicarTamanio() {
    let ancho = "16rem"; 
    if (tamanios[indiceTamanio] === "chico") {
        ancho = "10rem";
    } else if (tamanios[indiceTamanio] === "grande") {
        ancho = "24rem";
    }

    let imagenes = document.querySelectorAll(".obra img");
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].style.width = ancho;
    }
}


//cambio de colores
let temaOscuro = false;

let btnTema = document.querySelector("#btnTema");

btnTema.addEventListener("click", function () {
    temaOscuro = !temaOscuro;
    aplicarTema();
});

function aplicarTema() {
    let leyendas = document.querySelectorAll(".obra figcaption");

    if (temaOscuro) {
        galeria.style.backgroundColor = "#10263b";
        for (let i = 0; i < leyendas.length; i++) {
            leyendas[i].style.color = "#f7fbfe";
        }
    } else {
        galeria.style.backgroundColor = "";
        for (let i = 0; i < leyendas.length; i++) {
            leyendas[i].style.color = "";
        }
    }
}


//Datos curiosos
let datosCuriosos = [
    "Casey Reas es co-creador de Processing, un lenguaje de programación visual diseñado para artistas y estudiantes de diseño.",
    "Junto a Ben Fry desarrolló Processing como una herramienta educativa en el MIT Media Lab en 2001.",
    "Su obra artística se basa en la escritura de algoritmos que generan imágenes en constante cambio.",
    "Está influenciado por el arte conceptual y sistemático, especialmente por las instrucciones visuales de Sol LeWitt.",
    "Ha realizado exposiciones en museos como el MoMA, el Centre Pompidou y el ICA de Londres.",
    "Muchas de sus obras son generadas en tiempo real, por lo que nunca se ven exactamente igual dos veces.",
    "Publicó libros fundamentales sobre programación creativa como 'Processing: A Programming Handbook for Visual Designers and Artists'.",
    "Ha trabajado como profesor en el Departamento de Diseño de Medios en la UCLA (Universidad de California, Los Ángeles).",
    "Explora el arte generativo como un proceso basado en reglas simples que producen resultados complejos y emergentes.",
    "Además de visuales digitales, ha realizado impresiones generativas de gran formato como obras únicas o en series."
];

let btnDato = document.querySelector("#btnDato");
let dato = document.querySelector("#dato");

btnDato.addEventListener("click", function () {
    let indice = Math.floor(Math.random() * datosCuriosos.length);
    dato.innerText = datosCuriosos[indice];
});
