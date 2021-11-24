//Se define la clase Helado
class Helado {
  constructor(id, sabor, descripcion, img, stock) {
    this.id = id;
    this.sabor = sabor;
    this.descripcion = descripcion;
    this.img = img;
    this.stock = stock;
  }
}

class Combo {
  constructor(id, tipo) {
    this.id = id;
    this.tipo = tipo;
    this.sabores = [];

    switch (tipo) {
      case 1:
        this.precio = 299;
        this.cantidad = "1/4";
        this.numSabores = 2;
        break;
      case 2:
        this.precio = 549;
        this.cantidad = "1/2";
        this.numSabores = 3;
        break;
      case 3:
        this.precio = 999;
        this.cantidad = "1";
        this.numSabores = 4;
        break;

      default:
        break;
    }
  }
}

function agregarSabor(combo, helado) {
  // Se agrega un sabor al combo segun la cantidad de sabores del combo
  //disponibles y si ese sabor no esta repetido
  if (
    combo.sabores.length < combo.numSabores &&
    combo.sabores.find((i) => i.id === helado.id) == undefined
  ) {
    combo.sabores.push(helado);
    return true;
  } else {
    return false;
  }
}

function quitarSabor(combo, helado) {
  // Solo se llama a esta funcion cuando ya hay un helado seleccionado
  let indexCombo = combo.sabores.findIndex((i) => i.id === helado.id);

  if (indexCombo > -1) {
    combo.sabores.splice(indexCombo, 1);
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
    updateIndex(this.carro);
  }

  totalCompra() {
    let total = 0;
    for (const elementoCarro of this.carro) {
      total += elementoCarro.precio;
    }
    return total;
  }
}

function updateIndex(carro) {
  for (let index = 0; index < carro.length; index++) {
    carro[index].id = index + 1;
  }
}

const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

//MAIN

//Se cargan los helados disponibles, es decir, los sabores que el cliente
//podra elegir al momento de seleccionar un combo
let heladoFrutilla = new Helado(
  1,
  "frutilla",
  "Delicioso helado a base de agua, elaborado con fresas, frutillas, agraz y mora frescas de la región. Especial para las personas que adoran la frescura particular de una frutilla.",
  "img/frutilla.jpg",
  10
);
let heladoVainilla = new Helado(
  2,
  "vainilla",
  "Nuestro helado más popular, elaborado a partir de extractos de vainilla de alta calidad conocida como Madagascar, con un proceso de fabricación exclusivo que le da un aspecto muy cremoso.",
  "img/vainilla.jpg",
  10
);
let heladoDulceLeche = new Helado(
  3,
  "dulce de leche",
  "Nuestra receta más antigua, este helado de crema a base de dulce de leche Premium Argentino incorporá características únicas que le dan ese sabor tan reconocible por todos los argentinos.",
  "img/dulcedeleche.jpg",
  10
);
let heladoChocolate = new Helado(
  4,
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

//Se crea el carrito de compras
let carrito = new carroDeCompras();
// Si aun no se guardo variable en localStorage
if (localStorage.getItem("combosCarrito") == null) {
  guardarLocal("combosCarrito", JSON.stringify(carrito.carro));
}

//Se inicializan y guardan los combos disponibles
//new Combo(id, tipo) donde id es el identificador único y
//tipo de que combo se trata (250g, 500g ó 1kg)
const combosDisponibles = [new Combo(1, 1), new Combo(2, 2), new Combo(3, 3)];

// Se almacena array completo
guardarLocal("combosDisponibles", JSON.stringify(combosDisponibles));

//Obtenemos el listado almacenado
const combosAlmacenados = JSON.parse(localStorage.getItem("combosDisponibles"));
const combos = [];
//Iteramos almacenados con for...of para transformar todos sus objetos a tipo combo.
for (const objeto of combosAlmacenados) {
  combos.push(new Combo(objeto.id, objeto.tipo));
}

mostrarCombos(combos);
mostrarCarrito(carrito);
