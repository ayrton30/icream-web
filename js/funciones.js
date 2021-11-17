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
    boton.id = combo.id;

    boton.addEventListener("click", (event) => {
      //Obtenemos el listado almacenado
      const combos = JSON.parse(localStorage.getItem("combosCarrito"));
      carrito.carro = combos;

      console.log("El usuario agregó un producto al carrito");
      console.log(event.currentTarget.id);
      carrito.agregarCombo(new Combo(parseInt(event.currentTarget.id)));
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
  //let combos = carrito.carro;

  let i = 1;
  combos.forEach((element) => {
    $("#contenedorCarrito").append(`<div class="tienda__div my-2 p-1"> 
    <div class="d-flex flex-column align-items-center">
    <h1 id="btn_combo_${i}" class="mt-1 px-3 fs-5 shadow-lg text-light tienda__button"><i class="fas fa-times"></i></h1>  
    <h1 class="fs-2 text-center fw-bold">Combo de ${element.cantidad} kg.</h1>
    <h1 class="fs-5">Sabores:</h1>
    <h1 class="mt-1 px-3 fs-4 shadow-lg text-light tienda__button">$${element.precio}</h1>
    </div>
    </div>`);

    $(`#btn_combo_${i}`).on("click", (event) => {
      carrito.quitarCombo(element);
      // Se almacena array completo de combos en carrito
      guardarLocal("combosCarrito", JSON.stringify(carrito.carro));
      mostrarCarrito(carrito);
    });

    i++;
  });

  if (combos.length != 0) {
    $("#contenedorCarrito").append(
      `<div class="table text-end helados__table">
        <h1 class="fs-4 mb-2 p-1">Total de la compra: $${carrito.totalCompra()}</h1>
        <div class="d-flex align-items-baseline justify-content-end">
          <h1 class="fs-4 mb-2 p-1">Código:</h1>
          <input class="w-50" type="text" id="descIngresado">
          <div 
          onclick="buscarDescuento();" 
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

    $("#contenedorCarrito").fadeIn(150);

    // Para manejar el boton de Finalizar compra
    $("#btn_FinalizarCompra").on("click", () => {
      console.log("Compra finalizada");
    });
  }
}

function buscarDescuento() {
  const URLGET = "../descuentos.json";

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
