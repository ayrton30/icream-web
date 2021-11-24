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

//Función para mostrar todos los helados disponibles a la venta.
function mostrarHelados(helados) {
  for (const helado of helados) {
    $("#contenedorHelados").append(`
    <div class="col"> 
      <article class="container d-flex flex-column justify-content-around
      align-items-center tienda__helado mb-3">
        <img class="rounded-circle mt-1 tienda__helado__img"
        src="../${helado.img}"
        alt=""/>
        <h1 class="fs-1 tienda__helado__title">Helado de ${helado.sabor}</h1>
        <p class="fs-5 lh-sm">
          ${helado.descripcion}
        </p>
      </article>
    </div>
  `);
  }
}

//Función para mostrar todos los combos de helados disponibles a la venta.
function mostrarCombos(combos) {
  let contenedorCombos = document.getElementById("contenedorCombos");

  for (const combo of combos) {
    let contenedor = document.createElement("div");
    contenedor.className = "tienda__div p-4 text-center mb-2";

    //Definimos el innerHTML del elemento con una plantilla de texto
    contenedor.innerHTML = `<i class="fs-1 fas fa-glass-whiskey"></i>
      <h1 class="fs-1 fw-bold mb-2">${combo.cantidad} kg.</h1>`;

    //Creacion boton principal para agregar al carrito
    let boton = document.createElement("button");
    boton.className = "px-3 fs-3 shadow-lg text-light tienda__button";
    boton.innerHTML = `<i class="fas fa-cart-plus"></i> $${combo.precio}`;
    boton.id = combo.tipo;

    //Cada combo tiene su boton al cual se le agrega un evento de click
    boton.addEventListener("click", (event) => {
      //Obtenemos el listado almacenado
      const combos = JSON.parse(localStorage.getItem("combosCarrito"));
      carrito.carro = combos;

      console.log("El usuario agregó un producto al carrito");
      console.log(event.currentTarget.id);
      carrito.agregarCombo(
        new Combo(carrito.carro.length + 1, parseInt(event.currentTarget.id))
      );
      console.log(carrito);

      // Se almacena array completo de combos en carrito
      guardarLocal("combosCarrito", JSON.stringify(carrito.carro));

      //Se muestra todos los combos comprados!
      mostrarCarrito(carrito);
    });

    contenedorCombos.appendChild(contenedor);
    contenedor.appendChild(boton);
  }
}

function mostrarCarrito(carrito) {
  //Obtenemos el listado almacenado
  const combos = JSON.parse(localStorage.getItem("combosCarrito"));
  carrito.carro = combos;

  $("#contenedorCarrito").html("");
  $("#contenedorCarrito").addClass("container");
  $("#contenedorCarrito").hide();

  for (let i = 0; i < combos.length; i++) {
    let element = combos[i];
    $("#contenedorCarrito").append(`
    <div class="tienda__div my-2 p-1"> 
      <div class="d-flex flex-column align-items-center">
        <h1 id="btn_combo_${i}" class="mt-1 px-3 fs-5 shadow-lg text-light tienda__button">
        <i class="fas fa-times"></i></h1>  
        <h1 class="fs-2 text-center fw-bold">Combo de ${element.cantidad} kg.</h1>
        <div id="saboresHelados-${i}"></div>
        <h1 class="mt-3 px-3 fs-4 shadow-lg text-light tienda__button">$${element.precio}</h1>
      </div>
    </div>`);

    //Se dibuja los helados disponibles en cada combo comprado (en el carrito)
    //element => helado
    //combo[i] => combo en particular
    heladosDisponibles.forEach((element) => {
      $(`#saboresHelados-${i}`)
        .append(`<img id="${element.id}-${i}" class="rounded-circle mt-1 tienda__sabor"
                  src="../${element.img}"
                  alt=""/>`);

      // Si esta el sabor de helado en localStorage
      if (carrito.carro[i].sabores.find((n) => n.id === element.id)) {
        $(`#${element.id}-${i}`).addClass("tienda__sabor-selected");
      }

      //Cada imagen del sabor de helado tiene un evento asociado el cual
      //indica si ese sabor esta seleccionado o no
      $(
        $(`#${element.id}-${i}`).on("click", () => {
          console.log(`Click sabor: ${element.id}-${i}`);

          //Si no se encuentra seleccionado
          if (!$(`#${element.id}-${i}`).hasClass("tienda__sabor-selected")) {
            if (agregarSabor(carrito.carro[i], element)) {
              $(`#${element.id}-${i}`).addClass("tienda__sabor-selected");
              guardarLocal("combosCarrito", JSON.stringify(carrito.carro));
            }
          } else {
            quitarSabor(carrito.carro[i], element);
            $(`#${element.id}-${i}`).removeClass("tienda__sabor-selected");
            guardarLocal("combosCarrito", JSON.stringify(carrito.carro));
          }
        })
      );
    });

    $(`#btn_combo_${i}`).on("click", () => {
      carrito.quitarCombo(element);
      // Se almacena array completo de combos en carrito
      guardarLocal("combosCarrito", JSON.stringify(carrito.carro));
      mostrarCarrito(carrito);
    });
  }

  //Si existe algún combo en el carrito entonces se agregan elementos al DOM
  //que permiten aplicar descuentos y finalizar la compra
  if (combos.length != 0) {
    $("#contenedorCarrito").append(
      `<div class="table px-4 py-2 rounded text-end helados__table">
        <h1 class="fs-4 mb-2 p-1">Total de la compra: $${carrito.totalCompra()}</h1>
        <div class="d-flex align-items-baseline justify-content-end">
          <h1 class="fs-4 mb-2 p-1">Código:</h1>
          <input class="w-50 text-center border-2 contacto__input" type="text" id="descIngresado">
          <div onclick="buscarDescuento();" 
          class="rounded-3 tienda__button text-light">
            <i class="fas fa-plus"></i>
          </div>
        </div>
        <div class="d-flex justify-content-end" >
          <h1 class="fs-4 mb-2 p-1">Descuento: </h1>
          <h1 id="descuento" class="fs-4 mb-2 p-1"></h1>
        </div>

        <div class="d-flex justify-content-end" >
          <h1 class="fs-4 mb-2 p-1">Total: </h1>
          <h1 id="totalConDescuento" class="fs-4 mb-2 p-1"></h1>
        </div>
      </div>
      
      <h1 id="btn_FinalizarCompra" class="mt-1 fs-2 py-3 fw-bold shadow-lg text-light text-center tienda__button">
      <i class="fas fa-money-bill-wave"></i> Finalizar compra</h1>  
      `
    );
    $("#totalConDescuento").text(`$${carrito.totalCompra()}`);
    $("#contenedorCarrito").fadeIn(150);

    // Para manejar el boton de Finalizar compra
    finalizarCompra();
  }
}

function finalizarCompra() {
  $("#btn_FinalizarCompra").on("click", () => {
    let finalizado = true;
    let combosCarrito = carrito.carro;

    combosCarrito.forEach((combo) => {
      //Si algun combo no tiene seleccionado ningun helado
      if (combo.sabores.length == 0) {
        finalizado = false;
      }
    });

    if (finalizado) {
      console.log("Compra finalizada");
      console.log(carrito);
      alert(`Total de la compra: ${$("#totalConDescuento").text()}`);
    } else {
      alert(
        "Por favor seleccione como mínimo un sabor para cada combo en el carro."
      );
    }
  });
}

function buscarDescuento() {
  const URLGET = "../descuentos.json";
  //const URLGET =
  //"https://raw.githubusercontent.com/ayrton30/icream-web/cursoJS/descuentos.json";

  $.get(URLGET, function (respuesta, estado) {
    if (estado === "success") {
      let misDatos = respuesta;
      console.log(misDatos);
      console.log($("#descIngresado").val());
      let elementoDescuento = misDatos.find(
        (element) => element.codigoDescuento == $("#descIngresado").val()
      );

      if (elementoDescuento != undefined) {
        console.log(elementoDescuento.porcentaje);
        let descuento = (
          carrito.totalCompra() * elementoDescuento.porcentaje
        ).toFixed(1);
        let totalCompra = carrito.totalCompra() - descuento;
        $("#descuento").text(`-$${descuento}`);
        $("#totalConDescuento").text(`$${totalCompra}`);
      }
    }
  });
}
