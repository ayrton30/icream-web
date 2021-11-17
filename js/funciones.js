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

function mostrarCarrito(carrito) {
  $("#contenedorCarrito").html("");
  let combos = carrito.carro;

  let i = 1;
  combos.forEach((element) => {
    $("#contenedorCarrito").append(`<div class="tienda__div mt-3 p-1"> 
    <div class="d-flex flex-column align-items-center">
    <h1 id="btn_combo_${i}" class="mt-1 px-3 fs-5 shadow-lg text-light tienda__button"><i class="fas fa-times"></i></h1>  
    <h1 class="fs-2 text-center fw-bold">Combo de ${element.cantidad} kg.</h1>
    <h1 class="fs-5">Sabor:</h1>
    <h1 class="fs-5">Subtotal: $${element.precio}</h1>
    </div>
    </div>`);

    $(`#btn_combo_${i}`).on("click", () => {
      console.log(element);
      carrito.quitarCombo(element);
      mostrarCarrito(carrito);
    });

    i++;
  });

  $("#contenedorCarrito").append(
    `<h1 class="my-3 fs-2 text-end">Total de la compra: $${carrito.totalCompra()}</h1>`
  );
  $("#contenedorCarrito").append(
    `<h1 class="my-3 fs-2 text-end">Descuento: 10%</h1>`
  );
}
