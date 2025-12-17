// ejercicio1.js
// Sistema de Gestión y Validación de Transacciones Financieras
// Aquí implemento toda la lógica: validaciones, procesamiento, análisis lógico, asincronía y manejo de errores

// Función principal para procesar transacciones
export async function procesarTransacciones(transacciones) {
  let saldos = {}; // <--- Objeto vacío para acumular los saldos finales por usuario
  let rechazadas = []; // <--- Arreglo vacío para guardar las transacciones inválidas

  // Recorro cada transacción con un ciclo for-of
  for (const tx of transacciones) {
    try {
      validarTransaccion(tx); // <--- Valido los datos básicos de la transacción

      // Si el usuario no existe en el objeto saldos, lo inicializo en 0
      if (!saldos[tx.idUsuario]) {
        saldos[tx.idUsuario] = 0;
      }

      // Actualizo el saldo según el tipo de transacción
      saldos[tx.idUsuario] += tx.tipo === "ingreso" ? tx.monto : -tx.monto;

      // Validación externa simulada con async/await
      await validarExterna(tx);

    } catch (error) {
      rechazadas.push({ tx, motivo: error.message });
    }
  }

  // Análisis lógico: verifico si algún usuario quedó con saldo negativo
  for (const [usuario, saldo] of Object.entries(saldos)) {
    if (saldo < 0) {
      console.warn(`Usuario ${usuario} presenta saldo negativo: ${saldo}`);
    }
  }

  // Detecto egresos consecutivos
  detectarEgresosConsecutivos(transacciones);

  // Retorno un objeto con los saldos finales y las transacciones rechazadas
  return { saldos, rechazadas };
}

// Función para validar los datos básicos de cada transacción
function validarTransaccion(tx) {
  if (!tx.idUsuario || typeof tx.idUsuario !== "number") throw new Error("ID de usuario inválido");
  if (!["ingreso", "egreso"].includes(tx.tipo)) throw new Error("Tipo de transacción inválido");
  if (typeof tx.monto !== "number" || tx.monto <= 0) throw new Error("Monto inválido");
  if (!tx.categoria || typeof tx.categoria !== "string") throw new Error("Categoría inválida");
  if (!tx.fecha || typeof tx.fecha !== "string") throw new Error("Fecha inválida");
}

// Función para detectar egresos consecutivos por usuario
function detectarEgresosConsecutivos(transacciones) {
  let consecutivos = {};
  for (const tx of transacciones) {
    if (tx.tipo === "egreso") {
      consecutivos[tx.idUsuario] = (consecutivos[tx.idUsuario] || 0) + 1;
      if (consecutivos[tx.idUsuario] >= 2) {
        console.warn(`Usuario ${tx.idUsuario} tiene múltiples egresos consecutivos`);
      }
    } else {
      consecutivos[tx.idUsuario] = 0;
    }
  }
}

// Validación externa simulada con async/await
async function validarExterna(tx) {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulo un retardo de 300ms
  if (tx.monto > 1000000) {
    throw new Error("Transacción sospechosa por monto elevado");
  }
}