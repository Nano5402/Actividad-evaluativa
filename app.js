import PromptSync from "prompt-sync";
const prompt = PromptSync();

import { procesarInventario, procesarOrdenes } from "./modulos/index.js";

async function menu() {
  console.log(" MENÚ PRINCIPAL ");
  console.log("1. Ejercicio 1 Lotes");
  console.log("2. Ejercicio 2 - Ordenes");
  console.log("3. Salir");
  console.log(" ");
  

  const opcion = parseInt(prompt("Seleccione una opción: "));
  console.log(" ");
  

  switch (opcion) {
    case 1:
        const movimientos = [
      { idProducto: 1, nombreProducto: "Arroz", tipoMovimiento: "entrada", cantidad: 50, lote: "K123", activo: true },
      { idProducto: 1, nombreProducto: "Arroz", tipoMovimiento: "salida", cantidad: 20, lote: "K123", activo: true },
      { idProducto: 2, nombreProducto: "Pasta", tipoMovimiento: "salida", cantidad: 10, lote: "S123", activo: true }, 
      { idProducto: 3, nombreProducto: "Huevos", tipoMovimiento: "entrada", cantidad: -5, lote: "I123", activo: true }, 
      { idProducto: 4, nombreProducto: "Café", tipoMovimiento: "entrada", cantidad: 30, lote: "A123", activo: false }, 
      { idProducto: "5", nombreProducto: "Azúcar", tipoMovimiento: "entrada", cantidad: 25, lote: "X123", activo: true },
      { idProducto: 5, nombreProducto: 2, tipoMovimiento: "entrada", cantidad: 25, lote: "X123", activo: true },
      { idProducto: 6, nombreProducto: "Sal", tipoMovimiento: "entrar", cantidad: 25, lote: "X123", activo: true },
      { idProducto: 7, nombreProducto: "Ajo", tipoMovimiento: "entrada", cantidad: 0, lote: "X123", activo: true },
      { idProducto: 8, nombreProducto: "Vino", tipoMovimiento: "salida", cantidad: 12, lote: 123, activo: true },
      { idProducto: 9, nombreProducto: "Cerveza", tipoMovimiento: "entrada", cantidad: 40, lote: "C123", activo: "si" },
  ];

      const resultado = await procesarInventario(movimientos);
      console.log(" ");
      console.log("Estado final del inventario:", resultado.inventario);
      console.log(" ");
    console.log("Movimientos rechazados:", resultado.rechazados);
      break;
    case 2:
      const ordenes = [
    { id: 1, cliente: "Karol Nicolle", tipoServicio: "mantenimiento", horas: 4, pagado: true },
    { id: 2, cliente: "Sebastian Patiño", tipoServicio: "instalacion", horas: 3, pagado: false },
    { id: 3, cliente: "", tipoServicio: "soporte", horas: 2, pagado: true },
    { id: 4, cliente: "Ana Isabella", tipoServicio: "mantenimiento", horas: 12, pagado: true },
    { id: "a", cliente: "Wilmer Ardila", tipoServicio: "mantenimiento", horas: 16, pagado: true },
    { id: 5, cliente: "Manuel Serrano", tipoServicio: "support", horas: 36, pagado: true },
    { id: 6, cliente: "John Becerra", tipoServicio: "instalacion", horas: 0, pagado: true },
    { id: 7, cliente: "Paulo Pacheco", tipoServicio: "mantenimiento", horas: 6, pagado: "yes" }, 
      ]; 
      
      const result = await procesarOrdenes(ordenes);
      console.log(" ");
      console.log("Órdenes procesadas correctamente:", result.procesadas);
      console.log(" ");
      console.log("Órdenes rechazadas:", result.rechazadas);
      break;
    case 3:
      console.log("Saliendo...");
      break;
    default:
      console.log("Opción invalida.");
  }
}

menu();
