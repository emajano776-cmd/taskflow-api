const prisma = require('../utils/prisma');

async function listCategorias(req, res) {
  const categorias = await prisma.categoria.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'desc' },
  });

  res.json(categorias);
}

async function getCategoria(req, res) {
  const categoria = await prisma.categoria.findFirst({
    where: { id: Number(req.params.id), userId: req.userId },
  });

  if (!categoria) return res.status(404).json({ error: 'Categoria no encontrada' });
  res.json(categoria);
}

async function createCategoria(req, res) {
  const { name, color } = req.body;

  const categoria = await prisma.categoria.create({
    data: {
      name,
      color,
      userId: req.userId,
    },
  });

  res.status(201).json(categoria);
}

async function updateCategoria(req, res) {
  const { name, color } = req.body;

  const existing = await prisma.categoria.findFirst({
    where: { id: Number(req.params.id), userId: req.userId },
  });
  if (!existing) return res.status(404).json({ error: 'Categoria no encontrada' });

  const categoria = await prisma.categoria.update({
    where: { id: existing.id },
    data: {
      ...(name !== undefined && { name }),
      ...(color !== undefined && { color }),
    },
  });

  res.json(categoria);
}

async function deleteCategoria(req, res) {
  const existing = await prisma.categoria.findFirst({
    where: { id: Number(req.params.id), userId: req.userId },
  });
  if (!existing) return res.status(404).json({ error: 'Categoria no encontrada' });

  await prisma.categoria.delete({ where: { id: existing.id } });
  res.status(204).send();
}

module.exports = { listCategorias, getCategoria, createCategoria, updateCategoria, deleteCategoria };