---
description: Crea un endpoint CRUD completo siguiendo las convenciones del proyecto
agent: build
---

Crea un nuevo endpoint para el recurso "$ARGUMENTS" siguiendo EXACTAMENTE las
convenciones descritas en AGENTS.md:

1. Agrega el modelo a `prisma/schema.prisma` si no existe (pregúntame los campos si no los especifiqué).
2. Crea el controlador en `src/controllers/$ARGUMENTS.controller.js` con listar, obtener uno, crear, actualizar y eliminar.
3. Crea las rutas en `src/routes/$ARGUMENTS.routes.js`, protegidas con `authRequired`.
4. Móntalas en `src/index.js` bajo `/api/$ARGUMENTS`.
5. Usa `express-validator` para validar los campos obligatorios en crear/actualizar.
6. No inventes campos que no te haya dado. Pregunta antes de asumir el modelo de datos.
