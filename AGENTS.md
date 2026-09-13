# TaskFlow API — Guía para el agente (OpenCode)

Este archivo lo lee OpenCode automáticamente al iniciar sesión en este repo.
Úsalo para que el código generado siga SIEMPRE estas convenciones, en vez de
salidas genéricas.

## Stack
- Node.js + Express (CommonJS, no usar `import/export` de ES Modules)
- Prisma ORM + MySQL
- Autenticación con JWT (ver `src/middleware/auth.middleware.js`)
- Validación con `express-validator`

## Convenciones de código
- Controladores en `src/controllers/*.controller.js`, un archivo por recurso.
- Rutas en `src/routes/*.routes.js`, montadas en `src/index.js` bajo `/api/<recurso>`.
- Todas las rutas privadas deben usar el middleware `authRequired`.
- Los controladores devuelven siempre JSON con forma `{ error: "mensaje" }` en errores.
- Usar `async/await`, nunca `.then()/.catch()` encadenados.
- Nombrar variables y comentarios en español; nombres de funciones/variables en inglés (camelCase).
- Nunca commitear el archivo `.env`. Las claves nuevas van también en `.env.example` (sin valores reales).

## Base de datos
- Cualquier cambio de modelo va en `prisma/schema.prisma`.
- Después de editar el schema, correr `npm run prisma:migrate -- --name <descripcion>`.
- No escribir SQL crudo salvo que sea estrictamente necesario; usar el cliente de Prisma (`src/utils/prisma.js`).

## Git / flujo de trabajo
- Nunca hacer commit directo a `main`. Crear rama `feature/<nombre-corto>` o `fix/<nombre-corto>`.
- Mensajes de commit en formato: `tipo: descripción corta` (tipos: feat, fix, chore, refactor, docs, test).
- Antes de abrir un PR, correr `npm test` y asegurarse de que pase.

## Qué NO hacer
- No agregar frameworks o librerías nuevas sin preguntar primero.
- No cambiar la estructura de carpetas existente sin justificar por qué.
- No generar código "de ejemplo" con datos hardcodeados en controladores; usar la base de datos real vía Prisma.
