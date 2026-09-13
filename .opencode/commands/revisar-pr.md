---
description: Revisa los cambios locales antes de abrir un PR
agent: build
---

RUN git diff main...HEAD
RUN git status

Revisa los cambios de esta rama contra `main` y dame un reporte con:
1. Resumen de qué hace este cambio (2-3 líneas).
2. Posibles bugs o casos borde no manejados.
3. Si sigue las convenciones de AGENTS.md (nombres de archivos, manejo de errores, uso de Prisma).
4. Un mensaje de commit sugerido en formato `tipo: descripción`.
No modifiques ningún archivo, solo da el reporte.
