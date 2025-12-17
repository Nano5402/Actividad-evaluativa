Guía Técnica – Ejercicio 1  
Sistema de Gestión y Validación de Transacciones Financieras

---

1. Datos de entrada
- El sistema recibe un arreglo de objetos, cada objeto es una transacción financiera.  
- Cada transacción contiene:  
  - `idUsuario` (number)  
  - `tipo` (string: "ingreso" o "egreso")  
  - `monto` (number > 0)  
  - `categoria` (string)  
  - `fecha` (string, formato DD-MM-YYYY)

---

2. Procesos principales

1. Validación de datos  
   - Se revisa que cada campo cumpla las reglas mínimas.  
   - Si algo falla, se lanza un `Error` con mensaje claro.  

2. Procesamiento de transacciones  
   - Se recorre el arreglo con `for...of`.  
   - Se inicializa el saldo del usuario en 0 si no existe.  
   - Se actualiza el saldo:  
     - Si es ingreso, se suma.  
     - Si es egreso, se resta.  

3. Validación externa (async/await)  
   - Se simula un retardo de 300ms.  
   - Si el monto es mayor a 1 millón, se rechaza la transacción como sospechosa.  

4. Análisis lógico adicional  
   - Se detectan usuarios con saldo negativo.  
   - Se detectan usuarios con múltiples egresos consecutivos.  

5. Manejo de errores  
   - Todo el flujo está protegido con `try/catch`.  
   - Los errores se acumulan en un arreglo `rechazadas`.  
   - Los mensajes son claros y personalizados.  

---

 3. Datos de salida
- Saldos finales por usuario → objeto con cada usuario y su saldo.  
- Transacciones rechazadas** → arreglo con las transacciones inválidas y el motivo.  
- Mensajes en consola:  
  - Advertencia si un usuario queda con saldo negativo.  
  - Advertencia si un usuario tiene múltiples egresos consecutivos.  

4. Pruebas realizadas

Caso válido: ingreso y egreso correctos → saldo calculado bien.

Monto negativo: rechazado.

Tipo incorrecto: rechazado.

Saldo negativo: advertencia en consola.

Egresos consecutivos: advertencia en consola.

Monto sospechoso (>1 millón): rechazado por validación externa.

5. Justificación técnica

Uso de async/await → estilo moderno, más claro y legible.

Uso de try/catch → garantiza que el programa nunca se bloquee.

Separación en funciones (procesarTransacciones, validarTransaccion, detectarEgresosConsecutivos, validarExterna) → facilita mantenimiento y pruebas.

Uso de operadores modernos (for...of, ternario) → mejora la legibilidad y claridad del código