1. Datos de entrada
El sistema recibe un arreglo de objetos, cada objeto es una transacción financiera.

Cada transacción contiene:

idUsuario → número entero que identifica al usuario.

tipo → "ingreso" o "egreso".

monto → número mayor a 0.

categoria → texto que describe la categoría de la transacción.

fecha → texto con la fecha en formato YYYY-MM-DD.

Consideraciones:

El monto no puede ser cero ni negativo.

El tipo de transacción debe coincidir exactamente con los valores permitidos.

Pueden existir transacciones con datos incompletos o incorrectos.

Todos los datos deben validarse antes de cualquier cálculo.

2. Procesos principales
Validación de datos

Se revisa que cada campo cumpla las reglas mínimas.

Si algo falla, se lanza un Error con mensaje claro.

Procesamiento de transacciones

Se recorre el arreglo con for...of.

Se inicializa el saldo del usuario en 0 si no existe.

Se actualiza el saldo:

Si es ingreso, se suma.

Si es egreso, se resta.

Análisis lógico

Se identifican usuarios con saldo negativo.

Se detectan usuarios con múltiples egresos consecutivos.

Asincronía (solo async/await)

Se simula validación externa con un retardo de 300ms.

Si el monto es mayor a 1 millón, se rechaza la transacción.

Justificación:

async/await permite escribir código asincrónico más claro y legible, parecido al estilo síncrono.

Se eligió este enfoque porque simplifica el manejo de errores con try/catch.

Manejo de errores

Todo el flujo está protegido con try/catch.

Los errores se acumulan en un arreglo rechazadas.

Los mensajes son claros y personalizados.

El programa nunca se bloquea: sigue procesando las demás transacciones.

3. Datos de salida
Saldos finales por usuario → objeto con cada usuario y su saldo.

Transacciones rechazadas → arreglo con las transacciones inválidas y el motivo.

Mensajes en consola:

Advertencia si un usuario queda con saldo negativo.

Advertencia si un usuario tiene múltiples egresos consecutivos.

Mensajes de validación externa (OK o sospechosa).

4. Pruebas realizadas
Caso válido: ingreso y egreso correctos → saldo calculado bien.

Monto negativo: rechazado.

Tipo incorrecto: rechazado.

Saldo negativo: advertencia en consola.

Egresos consecutivos: advertencia en consola.

Monto sospechoso (>1 millón): rechazado por validación externa.

5. Justificación técnica
Uso de let y prompt-sync → permite interacción real con el usuario.

Uso de try/catch → garantiza que el programa nunca se bloquee.

Uso de async/await → hace más clara la simulación de validación externa.

Uso de operadores modernos → mejora la legibilidad y evita mutaciones peligrosas.

Separación en funciones (validarTransaccion, detectarEgresosConsecutivos, validarExterna) → facilita mantenimiento y pruebas.