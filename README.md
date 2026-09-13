# TaskFlow API

API REST de gestión de tareas con autenticación JWT, Express, Prisma y MySQL.
Proyecto pensado para practicar en un día y medio: Git/GitHub, base de datos,
VS Code, y OpenCode con configuración no genérica (AGENTS.md, MCP, comandos
personalizados).

---

## HOY (día 1) — Infraestructura y esqueleto funcionando

### 1. Instala lo necesario
```bash
# Node.js (si no lo tienes, usa nvm)
node -v   # v18+ recomendado

# MySQL — la forma más rápida es con Docker, si lo tienes:
docker run --name taskflow-mysql -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=taskflow -p 3306:3306 -d mysql:8

# Si no tienes Docker, instala MySQL directo:
#   Windows/Mac: https://dev.mysql.com/downloads/installer/
#   Linux: sudo apt install mysql-server
```

### 2. Instala OpenCode
```bash
npm install -g opencode-ai
# o: brew install sst/tap/opencode
opencode --version
```

### 3. Crea el repo en GitHub
- Ve a github.com → New repository → `taskflow-api` (público o privado, da igual para practicar)
- **No** inicialices con README (ya tenemos uno)

### 4. Clona este proyecto localmente y conéctalo a tu repo
```bash
cd taskflow-api
git init
git add .
git commit -m "chore: scaffold inicial del proyecto"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/taskflow-api.git
git push -u origin main
```

### 5. Configura el entorno
```bash
cp .env.example .env
# Edita .env con tu DATABASE_URL real y genera un JWT_SECRET:
openssl rand -hex 32
```

### 6. Instala dependencias y levanta la base de datos
```bash
npm install
npx prisma migrate dev --name init
npm run dev
```
Prueba que funcione: `curl http://localhost:3000/health` → debe responder `{"status":"ok"}`

### 7. Abre el proyecto en VS Code y arranca OpenCode
```bash
code .
# en una terminal integrada de VS Code:
opencode
```
Dentro de OpenCode corre `/init` si quieres que regenere/ajuste el AGENTS.md,
o déjalo como está — ya viene configurado para este proyecto.

### 8. Configura el MCP de GitHub (opcional pero recomendado)
Crea un token en https://github.com/settings/tokens (scope `repo`), agrégalo
a tu `.env` como `GITHUB_PAT`, y en `opencode.json` ya está listo para usarlo
(exporta la variable antes de abrir opencode: `export GITHUB_PAT=tu_token`).
Esto le permite a OpenCode crear PRs, leer issues, etc. directamente.

**Meta del día 1:** servidor corriendo, base de datos migrada, repo en GitHub
con el primer commit, OpenCode abierto y respondiendo dentro del proyecto.

---

## MAÑANA (día 2) — Funcionalidad completa + flujo de Git real

### 1. Prueba el flujo de autenticación
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"tu@correo.com","password":"123456","name":"Tu Nombre"}'

curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"tu@correo.com","password":"123456"}'
# copia el "token" de la respuesta
```

### 2. Prueba el CRUD de tareas (usa el token del paso anterior)
```bash
TOKEN="pega_aqui_tu_token"

curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Aprender OpenCode","description":"Practicar MCP y AGENTS.md"}'

curl http://localhost:3000/api/tasks -H "Authorization: Bearer $TOKEN"
```

### 3. Practica el flujo de ramas + PR con OpenCode
```bash
git checkout -b feature/filtro-tareas-por-fecha
opencode
# Dentro de opencode, prueba tu comando personalizado:
/nuevo-endpoint categorias
```
Deja que OpenCode proponga los cambios, revísalos en VS Code (pestaña de
cambios de Git), y cuando estés conforme:
```bash
git add .
git commit -m "feat: agrega endpoint de categorías"
git push -u origin feature/filtro-tareas-por-fecha
```
Ve a GitHub y abre un Pull Request de esa rama hacia `main`. Antes de hacer
merge, dentro de OpenCode corre:
```
/revisar-pr
```
para que te dé un reporte de calidad del cambio antes de mezclarlo.

### 4. Agrega algo tuyo
Ideas para practicar más (elige una):
- Paginación en `GET /api/tasks` (`?page=1&limit=10`)
- Endpoint para marcar todas las tareas vencidas como distintas de "DONE"
- Tests con Jest + Supertest para `/api/auth/login`

### 5. Cierra el ciclo
- Haz merge del PR en GitHub (así practicas el flujo real que usan en tu trabajo)
- Trae los cambios a tu rama local: `git checkout main && git pull`

**Meta del día 2:** al menos un PR completo (rama → cambios con OpenCode →
review → merge), y el CRUD funcionando de punta a punta con base de datos real.

---

## Sobre los archivos de OpenCode incluidos

| Archivo | Para qué sirve |
|---|---|
| `AGENTS.md` | Instrucciones de proyecto que OpenCode lee siempre — convenciones de código, stack, qué NO hacer |
| `opencode.json` | Config del proyecto: modelo a usar, MCP de GitHub, permisos |
| `.opencode/commands/nuevo-endpoint.md` | Comando `/nuevo-endpoint <recurso>` para generar CRUDs consistentes |
| `.opencode/commands/revisar-pr.md` | Comando `/revisar-pr` para que audite tus cambios antes de un PR |

Cuando quieras que se comporte distinto (por ejemplo, usar TypeScript en vez
de JS, o cambiar el estilo de commits), edita `AGENTS.md` — es la forma más
efectiva de que deje de dar respuestas genéricas.
