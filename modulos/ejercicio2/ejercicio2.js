// Aqui creo la funcion principal donde se procesaran los movimientos del inventario
export async function procesarInventario(movimientos) {
  const inventario = {}; // <--- Aqui inicializo un objeto vacio para almacenar el inventario
  const rechazados = []; // <--- Aqui inicializo un arreglo vacio para almacenar los movimientos rechazados

  // Aqui recorro cada uno de los movimientos que se van a procesar con un ciclo for-of
  for (const mov of movimientos) {
    try {
      // Validaciones básicas
      if (!mov.idProducto || typeof mov.idProducto !== "number") throw new Error("ID inválido"); // <--- Aqui en esta validacion me estoy segurando que id del producto sea un numero
      if (!mov.nombreProducto || typeof mov.nombreProducto !== "string") throw new Error("Nombre inválido"); // <--- Aqui valido que el nombre del producto sea una cadena de texto
      if (mov.tipoMovimiento !== "entrada" && mov.tipoMovimiento !== "salida") throw new Error("Tipo de movimiento inválido"); // <--- Aqui hago la validacion del tipo de movimiento que solo puede ser entrada o salida
      if (mov.cantidad <= 0) throw new Error("Cantidad inválida"); // <--- Esta es una validacion para que la cantidad sea mayor a 0 de manera obligatoria
      if (!mov.lote || typeof mov.lote !== "string") throw new Error("Lote inválido"); // <---  Aqui valido que el lote sea una cadena de texto
      if (typeof mov.activo !== "boolean") throw new Error("Estado activo inválido"); // <--- Esta es una validacion para que el estado del producto sea verdadero o falso

      // Si el producto está inactivo, lo rechazo
      if (!mov.activo) {
        rechazados.push({ mov, motivo: "Producto inactivo" }); // <--- Aqui agrego el movimiento rechazado al arreglo de rechazos junto con el motivo del rechazo
        continue;
      }

      // Inicializo el producto en inventario si no existe
      if (!inventario[mov.idProducto]) {
        inventario[mov.idProducto] = { nombre: mov.nombreProducto, cantidad: 0 }; // <--- Aqui inicializo un objeto con el nombre y cantidad del producto
      }

      // Actualizo inventario
      inventario[mov.idProducto].cantidad +=
        mov.tipoMovimiento === "entrada" ? mov.cantidad : -mov.cantidad; // <--- Aqui actualizo la cantidad del inventario segun el tipo de movimiento utilizando un operador ternario que suma o resta la cantidad dependiendo del tipo de movimiento

      // Alerta si queda negativo
      if (inventario[mov.idProducto].cantidad < 0) {
        console.warn(`Inventario negativo en ${mov.nombreProducto}`); // <--- Aqui muestro un mensaje de advertencia en la consola
      }

      // Validación de lote con async/await
      await validarLote(mov);

    } catch (error) {
      rechazados.push({ mov, motivo: error.message }); // <--- Aqui agrego el movimiento rechazado al arreglo de rechazos junto con el motivo del rechazo
    }
  }

  return { inventario, rechazados }; // <--- Aqui retorno un objeto con el inventario final y los movimientos rechazados
}

// Funcion asincronica para validar el lote externamente
async function validarLote(mov) {
  // Simulo una validación con un retardo
  await new Promise(resolve => setTimeout(resolve, 300)); // <--- Simulo un retardo de 300ms para la validacion

  // Simulo una respuesta externa utilizando .includes para rechazar lotes con "X" o "x"
  if (mov.lote.includes("x") || mov.lote.includes("X")) {
    throw new Error("Lote rechazado.");
  } else {
    console.log(`Lote ${mov.lote} validado correctamente`); // <--- Aqui muestro un mensaje en la consola indicando que el lote fue validado correctamente
  }
}