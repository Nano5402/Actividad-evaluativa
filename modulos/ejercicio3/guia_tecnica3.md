1. Datos de entrada
El sistema recibe un arreglo de objetos, cada objeto es una orden de servicio.

Cada orden trae:

id → número entero positivo que identifica la orden.

cliente → texto con el nombre del cliente.

tipoServicio → "mantenimiento", "instalacion" o "soporte".

horas → número mayor a 0.

pagado → booleano (true o false).

2. Proceso paso a paso
Inicialización

Se crean dos arreglos:

procesadas = [] → guarda las órdenes válidas con su costo.

rechazadas = [] → guarda las órdenes inválidas con el motivo del rechazo.

Recorrido de órdenes

Se usa un for...of para ir una por una.

Dentro del ciclo se hace un try/catch para que si algo falla, no se caiga el programa y simplemente se guarde el error en rechazadas.

Validaciones

Se revisa que cada campo cumpla lo esperado:

id sea número positivo.

cliente sea texto no vacío.

tipoServicio esté dentro de los permitidos.

horas sea número mayor a 0.

pagado sea booleano.

Si alguna falla, se lanza un Error con un mensaje claro.

Cálculo de costo

Se usa la función calcularCosto().

Multiplica las horas por la tarifa según el tipo de servicio:

Mantenimiento → 80.000

Instalación → 120.000

Soporte → 45.000

Validación externa (async/await)

Se simula un retardo de 300ms con await new Promise(...).

Si las horas son 9 o más, se rechaza la orden con el mensaje "Orden rechazada: exceso de horas.".

Si no, se imprime que la orden fue validada correctamente.

Procesamiento final

Si todo está bien, la orden se agrega a procesadas con su costo calculado.

Si algo falla, se captura en rechazadas.

3. Manejo de errores
Todo el flujo está protegido con try/catch.

Los errores no bloquean el programa, se acumulan en rechazadas.

Mensajes claros: "ID inválido", "Cliente inválido", "Servicio inválido", "Horas inválidas", "Estado de pago inválido", "Orden rechazada: exceso de horas.".

Esto asegura que el sistema sea tolerante a fallos.

4. Datos de salida
Órdenes procesadas correctamente → listado con cliente, servicio, horas y costo.

Órdenes rechazadas → listado con motivo de rechazo.

Mensajes en consola:

Validación externa exitosa o rechazada.

5. Pruebas realizadas
Caso válido: Karol Nicolle con mantenimiento → procesada con costo correcto.

Caso válido pero no pagado: Sebastián Patiño con instalación → procesada con costo correcto.

Cliente vacío: rechazado.

Horas excesivas (≥9): Ana Isabella → rechazado por validación externa.

ID no numérico: "a" → rechazado.

Servicio mal escrito: "support" → rechazado.

Horas cero: rechazado.

Pagado no booleano: "yes" → rechazado.