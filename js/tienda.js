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

const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

//MAIN

// Se crea el carrito de compras
let carrito = new carroDeCompras();
// Si aun no se guardo variable en localStorage
if (localStorage.getItem("combosCarrito") == null) {
  guardarLocal("combosCarrito", JSON.stringify(carrito.carro));
}

// Se inicializan y guardan los combos disponibles
const combosDisponibles = [new Combo(1), new Combo(2), new Combo(3)];

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
mostrarCarrito(carrito);

// Se cargan los helados disponibles
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

// Para manejar el boton que muestra o no los helados disponibles
let mostrar = true;
$("#btn_helados").on("click", () => {
  if (mostrar) {
    // Tengo que mostrar los helados
    mostrarHelados(heladosDisponibles);
    // Cambio la opción del boton
    $("#btn_helados").html(`<i class="fas fa-eye-slash"></i> Ocultar helados`);
  } else {
    $("#contenedorHelados").html("");
    $("#btn_helados").html(`<i class="fas fa-eye"></i> Mostrar helados`);
  }
  mostrar = !mostrar;
});
