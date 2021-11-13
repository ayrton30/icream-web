class Helado {
  constructor(sabor, descripcion, img, color, stock) {
    this.sabor = sabor;
    this.descripcion = descripcion;
    this.img = img;
    this.stock = stock; //kg
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

class Combo {
  constructor(cantidadPromo) {
    this.cantidadPromo = cantidadPromo;
    switch (cantidadPromo) {
      case "1/4":
        this.precio = 300;
        break;
      case "1/2":
        this.precio = 550;
        break;
      case "1":
        this.precio = 999;
        break;

      default:
        break;
    }
  }

  //Verifica que solo se eliga la cantidad max de helado
  //agregarHelado(helado) {}
}

function mostrarCombos(combos) {
  let contenedorCombos = document.getElementById("contenedorCombos");

  for (const combo of combos) {
    let contenedor = document.createElement("div");
    contenedor.className = "tienda__div p-2 text-center";
    //Definimos el innerHTML del elemento con una plantilla de texto
    contenedor.innerHTML = `<i class="fs-1 fas fa-glass-whiskey"></i>
    <h1 class="fs-3">${combo.cantidadPromo} kg.</h1>
    <button class="px-3 fs-4 shadow-lg tienda__button">
      <a class="link-light tienda__link" href=""
        ><i class="fas fa-cart-plus"></i> $${combo.precio}</a
      >
    </button>`;
    contenedorCombos.appendChild(contenedor);
  }
}

// Se cargan los combos disponibles
let comboCuarto = new Combo("1/4");
let comboMedio = new Combo("1/2");
let comboKilo = new Combo("1");
let combosDisponibles = [comboCuarto, comboMedio, comboKilo];

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

mostrarHelados(heladosDisponibles);
mostrarCombos(combosDisponibles);

/*
  // function(element) element:the current element being processed in the array.
  function existeHeladoCarro(elementoCarro) {
    // En cada posicion del Array de carro tenemos otro Array donde
    // carro = [elementoCarro0, elementoCarro1, ..., elementoCarroN]
    // elementoCarroN[0] = helado
    // elementoCarroN[1] = cantidad de gramos
  
    let heladoCarro = elementoCarro[0];
    return heladoCarro.sabor == this;
  }
  
  class carroDeCompras {
    constructor() {
      this.carro = [];
    }
  
    agregarHelado(helado, cantidadGramos) {
      const index = this.carro.findIndex(existeHeladoCarro, helado.sabor);
  
      // No hay helado de sabor cargado en el carro
      if (index == -1) {
        this.carro.push([helado, cantidadGramos]);
      } else {
        this.carro[index][1] = this.carro[index][1] + cantidadGramos;
      }
    }
  
    quitarHelado(helado, cantidadGramos) {
      const index = this.carro.findIndex(existeHeladoCarro, helado.sabor);
      if (index != -1) {
        let nuevaCantidadGramos = this.carro[index][1] - cantidadGramos;
        if (nuevaCantidadGramos > 0) {
          this.carro[index][1] = nuevaCantidadGramos;
        } else {
          //Error
        }
      } else {
        //No hay helado que quitar
      }
    }
  
    totalCompra() {
      let total = 0;
      for (const elementoCarro of this.carro) {
        let helado = elementoCarro[0];
        let cantidadGramos = elementoCarro[1];
        total += helado.precio * cantidadGramos;
      }
      return total;
    }
  
    //comprarUnKilo() se permiten hasta 4 sabores
    //comprarMedioKilo() se permiten hasta 3 sabores
    //comprarUnCuarto() se permiten hasta 2 sabores
  }
  
  // Se crea el carrito de compras
  let carrito = new carroDeCompras();
  
  /*
  carrito.agregarHelado(heladoFrutilla, 2);
  carrito.agregarHelado(heladoFrutilla, 2);
  carrito.agregarHelado(heladoVainilla, 3);
  carrito.agregarHelado(heladoVainilla, 3);
  console.log(carrito);
  carrito.quitarHelado(heladoFrutilla, 1);
  carrito.quitarHelado(heladoVainilla, 1);
  console.log(carrito);
  
  
  // Simulador de menú de compras
  let opcionHelado = parseInt(
    prompt(`
  ¿Qué helado desea comprar?
  Ingrese el helado que quiere comprar:
  1. Helado de frutilla
  2. Helado de vainilla
  3. Helado de dulce de leche
  4. Helado de chocolate
  `)
  );
  
  let opcionCantidad = parseFloat(prompt("Ingrese la cantidad de gramos"));
  switch (opcionHelado) {
    case 1:
      carrito.agregarHelado(heladoFrutilla, opcionCantidad);
      break;
    case 2:
      carrito.agregarHelado(heladoVainilla, opcionCantidad);
      break;
    case 3:
      carrito.agregarHelado(heladoDulceLeche, opcionCantidad);
      break;
    case 4:
      carrito.agregarHelado(heladoChocolate, opcionCantidad);
      break;
    default:
      break;
  }
  
  alert("El total de la compra es " + carrito.totalCompra());
  console.log();
  */
