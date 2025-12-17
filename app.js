// import PromptSync from "prompt-sync";
// const prompt = PromptSync();

// import { procesarInventario, procesarOrdenes, procesarTransacciones } from "./modulos/index.js";

// async function menu() {
//   console.log(" MENÚ PRINCIPAL ");
//   console.log("1. Ejercicio 1 - Lotes");
//   console.log("2. Ejercicio 2 - Órdenes");
//   console.log("3. Ejercicio 3 - Transacciones Financieras");
//   console.log("4. Salir");
//   console.log(" ");

//   const opcion = parseInt(prompt("Seleccione una opción: "));
//   console.log(" ");

//   switch (opcion) {
//     case 1:
//       const movimientos = [
//         { idProducto: 1, nombreProducto: "Arroz", tipoMovimiento: "entrada", cantidad: 50, lote: "K123", activo: true },
//         { idProducto: 1, nombreProducto: "Arroz", tipoMovimiento: "salida", cantidad: 20, lote: "K123", activo: true },
//         { idProducto: 2, nombreProducto: "Pasta", tipoMovimiento: "salida", cantidad: 10, lote: "S123", activo: true }, 
//         { idProducto: 3, nombreProducto: "Huevos", tipoMovimiento: "entrada", cantidad: -5, lote: "I123", activo: true }, 
//         { idProducto: 4, nombreProducto: "Café", tipoMovimiento: "entrada", cantidad: 30, lote: "A123", activo: false }, 
//         { idProducto: "5", nombreProducto: "Azúcar", tipoMovimiento: "entrada", cantidad: 25, lote: "X123", activo: true },
//         { idProducto: 5, nombreProducto: 2, tipoMovimiento: "entrada", cantidad: 25, lote: "X123", activo: true },
//         { idProducto: 6, nombreProducto: "Sal", tipoMovimiento: "entrar", cantidad: 25, lote: "X123", activo: true },
//         { idProducto: 7, nombreProducto: "Ajo", tipoMovimiento: "entrada", cantidad: 0, lote: "X123", activo: true },
//         { idProducto: 8, nombreProducto: "Vino", tipoMovimiento: "salida", cantidad: 12, lote: 123, activo: true },
//         { idProducto: 9, nombreProducto: "Cerveza", tipoMovimiento: "entrada", cantidad: 40, lote: "C123", activo: "si" },
//       ];

//       const resultado = await procesarInventario(movimientos);
//       console.log(" ");
//       console.log("Estado final del inventario:", resultado.inventario);
//       console.log(" ");
//       console.log("Movimientos rechazados:", resultado.rechazados);
//       break;

//     case 2:
//       const ordenes = [
//         { id: 1, cliente: "Karol Nicolle", tipoServicio: "mantenimiento", horas: 4, pagado: true },
//         { id: 2, cliente: "Sebastian Patiño", tipoServicio: "instalacion", horas: 3, pagado: false },
//         { id: 3, cliente: "", tipoServicio: "soporte", horas: 2, pagado: true },
//         { id: 4, cliente: "Ana Isabella", tipoServicio: "mantenimiento", horas: 12, pagado: true },
//         { id: "a", cliente: "Wilmer Ardila", tipoServicio: "mantenimiento", horas: 16, pagado: true },
//         { id: 5, cliente: "Manuel Serrano", tipoServicio: "support", horas: 36, pagado: true },
//         { id: 6, cliente: "John Becerra", tipoServicio: "instalacion", horas: 0, pagado: true },
//         { id: 7, cliente: "Paulo Pacheco", tipoServicio: "mantenimiento", horas: 6, pagado: "yes" }, 
//       ]; 

//       const result = await procesarOrdenes(ordenes);
//       console.log(" ");
//       console.log("Órdenes procesadas correctamente:", result.procesadas);
//       console.log(" ");
//       console.log("Órdenes rechazadas:", result.rechazadas);
//       break;

//     case 3:
//       const transacciones = [
//         { idUsuario: 1, tipo: "ingreso", monto: 500000, categoria: "salario", fecha: "2025-01-10" },
//         { idUsuario: 1, tipo: "egreso", monto: 200000, categoria: "compras", fecha: "2025-01-12" },
//         { idUsuario: 2, tipo: "ingreso", monto: 300000, categoria: "venta", fecha: "2025-01-11" },
//         { idUsuario: 2, tipo: "egreso", monto: 400000, categoria: "viaje", fecha: "2025-01-13" }, // saldo negativo
//         { idUsuario: 3, tipo: "egreso", monto: 100000, categoria: "servicios", fecha: "2025-01-14" },
//         { idUsuario: 3, tipo: "egreso", monto: 150000, categoria: "compras", fecha: "2025-01-15" }, // egresos consecutivos
//         { idUsuario: 4, tipo: "ingreso", monto: -50000, categoria: "error", fecha: "2025-01-16" }, // inválida
//         { idUsuario: 5, tipo: "ingreso", monto: 2000000, categoria: "bono", fecha: "2025-01-17" }, // sospechosa
//       ];

//       const resultadoTx = await procesarTransacciones(transacciones);
//       console.log(" ");
//       console.log("Saldos finales por usuario:", resultadoTx.saldos);
//       console.log(" ");
//       console.log("Transacciones rechazadas:", resultadoTx.rechazadas);
//       break;

//     case 4:
//       console.log("Saliendo...");
//       break;

//     default:
//       console.log("Opción inválida.");
//   }
// }

// menu();


import PromptSync from "prompt-sync";
const prompt = PromptSync();

import { procesarInventario, procesarOrdenes, procesarTransacciones } from "./modulos/index.js";

async function menu() {
  console.log(" MENÚ PRINCIPAL ");
  console.log("1. Ejercicio 1 - Lotes");
  console.log("2. Ejercicio 2 - Órdenes");
  console.log("3. Ejercicio 3 - Transacciones Financieras");
  console.log("4. Salir");
  console.log(" ");

  const opcion = parseInt(prompt("Seleccione una opción: "));
  console.log(" ");

  switch (opcion) {
    case 1:
      // Ejercicio 1 - Inventario por Lotes
      let movimientos = [];
      let cantidadMovimientos = parseInt(prompt("¿Cuántos movimientos desea ingresar? "));

      for (let i = 0; i < cantidadMovimientos; i++) {
        console.log(`\n--- Movimiento ${i + 1} ---`);
        let idProducto = parseInt(prompt("Ingrese el ID del producto: "));
        let nombreProducto = prompt("Ingrese el nombre del producto: ");
        let tipoMovimiento = prompt("Ingrese el tipo de movimiento (entrada/salida): ");
        let cantidad = parseInt(prompt("Ingrese la cantidad: "));
        let lote = prompt("Ingrese el lote: ");
        let activo = prompt("¿El producto está activo? (true/false): ") === "true";

        movimientos.push({ idProducto, nombreProducto, tipoMovimiento, cantidad, lote, activo });
      }

      const resultado = await procesarInventario(movimientos);
      console.log(" ");
      console.log("Estado final del inventario:", resultado.inventario);
      console.log(" ");
      console.log("Movimientos rechazados:", resultado.rechazados);
      break;

    case 2:
      // Ejercicio 2 - Órdenes de Servicio
      let ordenes = [];
      let cantidadOrdenes = parseInt(prompt("¿Cuántas órdenes desea ingresar? "));

      for (let i = 0; i < cantidadOrdenes; i++) {
        console.log(`\n--- Orden ${i + 1} ---`);
        let id = parseInt(prompt("Ingrese el ID de la orden: "));
        let cliente = prompt("Ingrese el nombre del cliente: ");
        let tipoServicio = prompt("Ingrese el tipo de servicio (mantenimiento/instalacion/soporte): ");
        let horas = parseInt(prompt("Ingrese la cantidad de horas: "));
        let pagado = prompt("¿La orden está pagada? (true/false): ") === "true";

        ordenes.push({ id, cliente, tipoServicio, horas, pagado });
      }

      const result = await procesarOrdenes(ordenes);
      console.log(" ");
      console.log("Órdenes procesadas correctamente:", result.procesadas);
      console.log(" ");
      console.log("Órdenes rechazadas:", result.rechazadas);
      break;

    case 3:
      // Ejercicio 3 - Transacciones Financieras
      let transacciones = [];
      let cantidadTransacciones = parseInt(prompt("¿Cuántas transacciones desea ingresar? "));

      for (let i = 0; i < cantidadTransacciones; i++) {
        console.log(`\n--- Transacción ${i + 1} ---`);
        let idUsuario = parseInt(prompt("Ingrese el ID del usuario: "));
        let tipo = prompt("Ingrese el tipo de transacción (ingreso/egreso): ");
        let monto = parseFloat(prompt("Ingrese el monto: "));
        let categoria = prompt("Ingrese la categoría: ");
        let fecha = prompt("Ingrese la fecha (DD-MM-YYYY): ");

        transacciones.push({ idUsuario, tipo, monto, categoria, fecha });
      }

      const resultadoTx = await procesarTransacciones(transacciones);
      console.log(" ");
      console.log("Saldos finales por usuario:", resultadoTx.saldos);
      console.log(" ");
      console.log("Transacciones rechazadas:", resultadoTx.rechazadas);
      break;

    case 4:
      console.log("Saliendo...");
      break;

    default:
      console.log("Opción inválida.");
  }
}

menu();
