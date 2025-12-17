// Función principal para procesar órdenes de servicio
export async function procesarOrdenes(ordenes) {
  const procesadas = []; // <--- Aqui inicializo un arreglo para almacenar las órdenes procesadas
  const rechazadas = []; // <--- Aqui inicializo un arreglo para almacenar las órdenes rechazadas

  // Recorro cada una de las órdenes con un ciclo for-of
  for (const orden of ordenes) {
    try {
      // Validaciones básicas
      if (!orden.id || typeof orden.id !== "number" || orden.id <= 0) throw new Error("ID inválido"); // <--- Aqui en esta validacion me estoy segurando que id de la orden sea un numero positivo
      if (!orden.cliente || typeof orden.cliente !== "string") throw new Error("Cliente inválido"); // <--- Aqui valido que el nombre del cliente sea una cadena de texto
      if (!["mantenimiento", "instalacion", "soporte"].includes(orden.tipoServicio)) throw new Error("Servicio inválido"); // <--- Aqui hago la validacion del tipo de servicio que solo puede ser mantenimiento, instalacion o soporte
      if (typeof orden.horas !== "number" || orden.horas <= 0) throw new Error("Horas inválidas"); // <--- Esta es una validacion para que las horas sean un numero mayor a 0 de manera obligatoria
      if (typeof orden.pagado !== "boolean") throw new Error("Estado de pago inválido"); // <--- Esta es una validacion para que el estado de pago sea verdadero o falso

      // Calcular costo
      const costo = calcularCosto(orden); // <--- Aqui llamo a la funcion para calcular el costo segun el tipo de servicio

      // Procesamiento asincrónico simulado
      await validarOrden(orden); // <--- Aqui llamo a la funcion asincronica para validar la orden externamente

      // Si todo está bien, agrego a procesadas
      procesadas.push({ ...orden, costo }); // <--- Aqui agrego la orden procesada al arreglo de procesadas junto con el costo calculado utilizando el operador spread

    } catch (error) {
      rechazadas.push({ orden, motivo: error.message }); // <--- Aqui agrego la orden rechazada al arreglo de rechazadas junto con el motivo del rechazo
    }
  }

  return { procesadas, rechazadas }; // <--- Aqui retorno 2 objetos 1 con las órdenes procesadas y otro con las rechazadas
}
 
// Creo una funcion para calcular el costo segun el tipo de servicio
function calcularCosto(orden) {
  const tarifas = {  // <--- Aqui defino un objeto con las tarifas por tipo de servicio
    mantenimiento: 80000,
    instalacion: 120000,
    soporte: 45000
  }
  return orden.horas * tarifas[orden.tipoServicio]; // <--- Aqui calculo el costo multiplicando las horas por la tarifa segun el tipo de servicio
}

async function validarOrden(orden) { 
  await new Promise(resolve => setTimeout(resolve, 300))

  if (orden.horas >= 9) {
    throw new Error("Orden rechazada: exceso de horas.")
  } else {
    console.log(`Orden ${orden.id} validada.`);
  }
}