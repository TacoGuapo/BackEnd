// index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/routes.js';
import incidenciaRoutes from './routes/incidencias.routes.js';
import { manejarErrorArchivo } from './helper.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/incidencias', incidenciaRoutes);
app.use(manejarErrorArchivo);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
