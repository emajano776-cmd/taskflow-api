const prisma = require('../utils/prisma');

async function listTasks(req, res) {
  const { status } = req.query;

  const tasks = await prisma.task.findMany({
    where: {
      userId: req.userId,
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json(tasks);
}

async function getTask(req, res) {
  const task = await prisma.task.findFirst({
    where: { id: Number(req.params.id), userId: req.userId },
  });

  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(task);
}

async function createTask(req, res) {
  const { title, description, dueDate } = req.body;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId: req.userId,
    },
  });

  res.status(201).json(task);
}

async function updateTask(req, res) {
  const { title, description, status, dueDate } = req.body;

  const existing = await prisma.task.findFirst({
    where: { id: Number(req.params.id), userId: req.userId },
  });
  if (!existing) return res.status(404).json({ error: 'Tarea no encontrada' });

  const task = await prisma.task.update({
    where: { id: existing.id },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(status !== undefined && { status }),
      ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
    },
  });

  res.json(task);
}

async function deleteTask(req, res) {
  const existing = await prisma.task.findFirst({
    where: { id: Number(req.params.id), userId: req.userId },
  });
  if (!existing) return res.status(404).json({ error: 'Tarea no encontrada' });

  await prisma.task.delete({ where: { id: existing.id } });
  res.status(204).send();
}

module.exports = { listTasks, getTask, createTask, updateTask, deleteTask };
