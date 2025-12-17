// ejercicio1.js
// Sistema de Gestión y Validación de Transacciones Financieras
// Aquí implemento toda la lógica: validaciones, procesamiento, análisis lógico, asincronía y manejo de errores

// Función principal para procesar transacciones
export async function procesarTransacciones(transacciones) {
  let saldos = {}; // <--- Aquí inicializo un objeto vacío para acumular los saldos finales por usuario
  let rechazadas = []; // <--- Aquí inicializo un arreglo vacío para guardar las transacciones inválidas

  // Recorro cada transacción con un ciclo for-of
  for (const tx of transacciones) {
    try {
      validarTransaccion(tx); // <--- Aquí llamo a la función que valida los datos básicos de la transacción

      // Si el usuario no existe en el objeto saldos, lo inicializo en 0
      if (!saldos[tx.idUsuario]) {
        saldos[tx.idUsuario] = 0; // <--- Aquí creo la clave del usuario con saldo inicial en 0
      }

      // Actualizo el saldo según el tipo de transacción
      saldos[tx.idUsuario] += tx.tipo === "ingreso" ? tx.monto : -tx.monto; 
      // <--- Aquí uso un operador ternario: si es ingreso sumo, si es egreso resto

      // Validación externa simulada con async/await
      await validarExternaAsync(tx); // <--- Aquí llamo a la validación externa que simula un retardo

    } catch (error) {
      rechazadas.push({ tx, motivo: error.message }); 
      // <--- Si algo falla, capturo el error y guardo la transacción en rechazadas junto con el motivo
    }
  }

  // Análisis lógico: verifico si algún usuario quedó con saldo negativo
  for (const [usuario, saldo] of Object.entries(saldos)) {
    if (saldo < 0) {
      console.warn(`Usuario ${usuario} presenta saldo negativo: ${saldo}`); 
      // <--- Aquí muestro un mensaje de advertencia en consola si el saldo es menor a 0
    }
  }

  // Llamo a la función que detecta egresos consecutivos
  detectarEgresosConsecutivos(transacciones);

  // Retorno un objeto con los saldos finales y las transacciones rechazadas
  return { saldos, rechazadas };
}

// Función para validar los datos básicos de cada transacción
function validarTransaccion(tx) {
  if (!tx.idUsuario || typeof tx.idUsuario !== "number") throw new Error("ID de usuario inválido"); // <--- Valido que el idUsuario exista y sea número
  if (!["ingreso", "egreso"].includes(tx.tipo)) throw new Error("Tipo de transacción inválido"); // <--- Valido que el tipo sea ingreso o egreso
  if (typeof tx.monto !== "number" || tx.monto <= 0) throw new Error("Monto inválido"); // <--- Valido que el monto sea número y mayor a 0
  if (!tx.categoria || typeof tx.categoria !== "string") throw new Error("Categoría inválida"); // <--- Valido que la categoría exista y sea texto
  if (!tx.fecha || typeof tx.fecha !== "string") throw new Error("Fecha inválida"); // <--- Valido que la fecha exista y sea texto
}

// Función para detectar egresos consecutivos por usuario
function detectarEgresosConsecutivos(transacciones) {
  let consecutivos = {}; // <--- Aquí inicializo un objeto para contar egresos consecutivos por usuario
  for (const tx of transacciones) {
    if (tx.tipo === "egreso") {
      consecutivos[tx.idUsuario] = (consecutivos[tx.idUsuario] || 0) + 1; 
      // <--- Si es egreso, incremento el contador del usuario
      if (consecutivos[tx.idUsuario] >= 2) {
        console.warn(`Usuario ${tx.idUsuario} tiene múltiples egresos consecutivos`); 
        // <--- Si el contador llega a 2 o más, muestro advertencia
      }
    } else {
      consecutivos[tx.idUsuario] = 0; // <--- Si la transacción no es egreso, reinicio el contador
    }
  }
}

// Validación externa simulada con callback
export function validarExternaCallback(tx, callback) {
  setTimeout(() => {
    if (tx.monto > 1000000) {
      callback(new Error("Transacción sospechosa por monto elevado")); 
      // <--- Si el monto es mayor a 1 millón, rechazo la transacción
    } else {
      callback(null, "Validación externa OK"); 
      // <--- Si no, retorno que la validación fue correcta
    }
  }, 300); // <--- Simulo un retardo de 300ms
}

// Validación externa simulada con promesa
export function validarExternaPromesa(tx) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tx.monto > 1000000) {
        reject(new Error("Transacción sospechosa por monto elevado")); 
        // <--- Si el monto es mayor a 1 millón, rechazo la promesa
      } else {
        resolve("Validación externa OK"); 
        // <--- Si no, resuelvo la promesa con mensaje de éxito
      }
    }, 300); // <--- Simulo un retardo de 300ms
  });
}

// Validación externa simulada con async/await
async function validarExternaAsync(tx) {
  await new Promise((resolve) => setTimeout(resolve, 300)); // <--- Aquí simulo un retardo de 300ms
  if (tx.monto > 1000000) {
    throw new Error("Transacción sospechosa por monto elevado"); 
    // <--- Si el monto es mayor a 1 millón, lanzo un error
  }
}
