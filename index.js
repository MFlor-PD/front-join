import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import Task from './model/Task.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;


const tasks = [];

app.use(cors());
app.use(express.json()); 


app.post('/create', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Falta el título' });

  try {
    const newTask = await Task.create({ title });
    res.status(201).json({ message: 'Tarea creada', task: newTask });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});


app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
