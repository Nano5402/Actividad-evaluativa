1. Datos de entrada
El sistema recibe un arreglo de objetos, cada objeto es un movimiento de inventario.

Cada movimiento trae:

idProducto → número entero que identifica el producto.

nombreProducto → texto con el nombre.

tipoMovimiento → "entrada" o "salida".

cantidad → número mayor a 0.

lote → texto que representa el lote.

activo → booleano (true o false).

2. Proceso paso a paso
Inicialización

Se crean dos estructuras:

inventario = {} → guarda el estado final de cada producto.

rechazados = [] → lista de movimientos que no pasaron las validaciones.

Recorrido de movimientos

Se usa un for...of para ir uno por uno.

Dentro del ciclo se hace un try/catch para que si algo falla, no se caiga el programa y simplemente se guarde el error en rechazados.

Validaciones

Se revisa que cada campo cumpla lo esperado:

idProducto sea número.

nombreProducto sea texto.

tipoMovimiento sea "entrada" o "salida".

cantidad > 0.

lote sea texto.

activo sea booleano.

Si alguna falla, se lanza un Error con un mensaje claro.

Procesamiento

Si el producto está inactivo (activo: false), se rechaza directamente.

Si el producto no existe en inventario, se inicializa con cantidad 0.

Se actualiza la cantidad:

Si es "entrada", se suma.

Si es "salida", se resta.

Si la cantidad queda negativa, se lanza un console.warn para avisar.

Validación externa del lote (async/await)

Se simula un retardo de 300ms con await new Promise(...).

Si el lote contiene "X" o "x", se rechaza con error.

Si no, se imprime que el lote fue validado correctamente.

Retorno

Al final, se devuelve un objeto con:

inventario → estado final de cada producto.

rechazados → lista de movimientos inválidos.

3. Manejo de errores
Todo el flujo está protegido con try/catch.

Los errores no bloquean el programa, se acumulan en rechazados.

Mensajes claros: "ID inválido", "Cantidad inválida", "Producto inactivo", "Lote rechazado".

Esto asegura que el sistema sea tolerante a fallos.

4. Datos de salida
Inventario final → objeto con productos y cantidades.

Movimientos rechazados → arreglo con el motivo de cada rechazo.

Mensajes en consola:

Advertencia si inventario queda negativo.

Validación de lote exitosa o rechazada.

5. Pruebas realizadas
Caso válido: Arroz con entrada y salida → inventario correcto.

Cantidad negativa: Huevos con -5 → rechazado.

Producto inactivo: Café → rechazado.

ID como string: Azúcar con "5" → rechazado.

Nombre como número: Producto 5 → rechazado.

Tipo incorrecto: Sal con "entrar" → rechazado.

Cantidad cero: Ajo → rechazado.

Lote no string: Vino con 123 → rechazado.

Activo no booleano: Cerveza con "si" → rechazado.

Lote sospechoso: Azúcar con "X123" → rechazado por validación externa.