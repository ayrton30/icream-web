class Helado {
  constructor(sabor, descripcion, img, color, stock) {
    this.sabor = sabor;
    this.descripcion = descripcion;
    this.img = img;
    this.stock = stock; //kg
  }
}

class Combo {
  constructor(id) {
    this.id = id;
    switch (id) {
      case 1:
        this.precio = 299;
        this.cantidad = "1/4";
        break;
      case 2:
        this.precio = 549;
        this.cantidad = "1/2";
        break;
      case 3:
        this.precio = 999;
        this.cantidad = "1";
        break;

      default:
        break;
    }
  }
}

class carroDeCompras {
  constructor() {
    this.carro = [];
  }

  agregarCombo(combo) {
    this.carro.push(combo);
  }

  quitarCombo(combo) {
    let indexCombo = this.carro.findIndex((i) => i.id === combo.id);
    console.log(indexCombo);
    if (indexCombo > -1) {
      this.carro.splice(indexCombo, 1);
    }
  }

  totalCompra() {
    let total = 0;
    for (const elementoCarro of this.carro) {
      total += elementoCarro.precio;
    }
    return total;
  }
}

function mostrarHelados(helados) {
  let contenedorHelados = document.getElementById("contenedorHelados");

  for (const helado of helados) {
    let contenedor = document.createElement("div");
    contenedor.className = "col";
    //Definimos el innerHTML del elemento con una plantilla de texto
    contenedor.innerHTML = `<article class="container d-flex flex-column justify-content-around
        align-items-center tienda__helado mb-3">
        <img class="rounded-circle mt-1 tienda__helado__img"
        src="../${helado.img}"
        alt=""/>
        <h1 class="fs-1 tienda__helado__title">Helado de ${helado.sabor}</h1>
        <p class="fs-5 lh-sm">
          ${helado.descripcion}
        </p>
      </article>`;
    contenedorHelados.appendChild(contenedor);
  }
}

function mostrarCombos(combos) {
  let contenedorCombos = document.getElementById("contenedorCombos");

  for (const combo of combos) {
    let contenedor = document.createElement("div");
    contenedor.className = "tienda__div p-2 text-center";
    //Definimos el innerHTML del elemento con una plantilla de texto
    contenedor.innerHTML = `<i class="fs-1 fas fa-glass-whiskey"></i>
    <h1 class="fs-3">${combo.cantidad} kg.</h1>`;

    //Creacion boton principal para agregar al carrito
    let boton = document.createElement("button");
    boton.className = "px-3 fs-4 shadow-lg text-light tienda__button";
    boton.innerHTML = `<i class="fas fa-cart-plus"></i> $${combo.precio}`;
    boton.id = combo.id;

    boton.addEventListener("click", (event) => {
      console.log("El usuario agregó un producto al carrito");
      console.log(event.currentTarget.id);
      carrito.agregarCombo(new Combo(parseInt(event.currentTarget.id)));
      console.log(carrito);

      //Se muestra todos los combos comprados!
      mostrarCarrito(carrito);
    });

    contenedorCombos.appendChild(contenedor);
    contenedor.appendChild(boton);
  }
}

// Manejadores de eventos (boton) para agregar o quitar del carrito
function sumaCombo(evento) {
  console.log("boton de suma");
  carrito.agregarCombo(new Combo(parseInt(evento.currentTarget.id)));
  mostrarCarrito(carrito);
}

function restaCombo(evento) {
  console.log("boton de resta");
  carrito.quitarCombo(new Combo(parseInt(evento.currentTarget.id)));
  mostrarCarrito(carrito);
  //@to-DO
}

function mostrarCarrito(carrito) {
  let contenedorCarrito = document.getElementById("contenedorCarrito");
  contenedorCarrito.innerHTML = "";
  let combos = carrito.carro;
  const cantidadIdCombos = 3; //Existen 3 combos!
  let cantidadesCombo = [];

  //cantidadesCombo es un array que contiene la cantidad de combos comprados
  for (let i = 1; i <= cantidadIdCombos; i++) {
    const count = combos.filter((obj) => obj.id === i).length;
    cantidadesCombo[i - 1] = count;

    // Solo se dibuja los combos seleccionados
    if (count != 0) {
      let contenedor = document.createElement("div");
      contenedor.className = "tienda__div mt-3 p-3";
      //Definimos el innerHTML del elemento con una plantilla de texto
      contenedor.innerHTML = `<div class="d-flex justify-content-between">
      <h1 class="fs-4">Combo ${new Combo(i).cantidad} kg.</h1>
      <div class="d-flex justify-content-end align-items-center">
        <div id="${i}"
          onclick="restaCombo(event);"
          class="rounded-3 p-1 tienda__button text-light"
        >
          <i class="fas fa-minus"></i>
        </div>
        <div><h1 class="mb-0 px-1">${count}</h1></div>

        <div id="${i}" 
        onclick="sumaCombo(event);" 
        class="rounded-3 p-1 tienda__button text-light">
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </div>
    <div class="mt-2 d-flex justify-content-between">
      <h1 class="fs-5">Sabor:</h1>
      <h1 class="fs-5">Subtotal: $${new Combo(i).precio * count}</h1>
    </div>`;
      contenedorCarrito.appendChild(contenedor);
    }
  }

  let contenedor = document.createElement("h1");
  contenedor.className = "mt-3 fs-2 text-end";
  contenedor.innerText = `Total de la compra: $${carrito.totalCompra()}`;
  contenedorCarrito.appendChild(contenedor);

  console.log(cantidadesCombo);
}

//MAIN

// Se crea el carrito de compras
let carrito = new carroDeCompras();

// Se inicializan y guardan los combos disponibles
const combosDisponibles = [new Combo(1), new Combo(2), new Combo(3)];

const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

// Se almacena array completo
guardarLocal("combosDisponibles", JSON.stringify(combosDisponibles));

//Obtenemos el listado almacenado
const combosAlmacenados = JSON.parse(localStorage.getItem("combosDisponibles"));
const combos = [];
//Iteramos almacenados con for...of para transformar todos sus objetos a tipo combo.
for (const objeto of combosAlmacenados) {
  combos.push(new Combo(objeto.id));
}
mostrarCombos(combos);

// mostrarHelados(heladosDisponibles);
// Se cargan los helados disponibles
/*
let heladoFrutilla = new Helado(
  "frutilla",
  "Delicioso helado a base de agua, elaborado con fresas, frutillas, agraz y mora frescas de la región. Especial para las personas que adoran la frescura particular de una frutilla.",
  "img/frutilla.jpg",
  10
);
let heladoVainilla = new Helado(
  "vainilla",
  "Nuestro helado más popular, elaborado a partir de extractos de vainilla de alta calidad conocida como Madagascar, con un proceso de fabricación exclusivo que le da un aspecto muy cremoso.",
  "img/vainilla.jpg",
  10
);
let heladoDulceLeche = new Helado(
  "dulce de leche",
  "Nuestra receta más antigua, este helado de crema a base de dulce de leche Premium Argentino incorporá características únicas que le dan ese sabor tan reconocible por todos los argentinos.",
  "img/dulcedeleche.jpg",
  10
);
let heladoChocolate = new Helado(
  "chocolate",
  "Exquisito helado de chocolate elaborado a partir de chocolate vegano orgánico de Perú: la región de cacao más antigua del mundo. Contiene trocitos de chocolate y avellanas.",
  "img/chocolate.jpg",
  10
);
let heladosDisponibles = [
  heladoFrutilla,
  heladoVainilla,
  heladoDulceLeche,
  heladoChocolate,
];
*/
