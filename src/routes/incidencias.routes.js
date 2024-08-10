import { Router } from 'express';
import { crearIncidencia, obtenerTodasIncidencias } from '../controllers/incidencia.controller.js';
import verifyToken from '../middleware/auth.js';
import { verificarRol } from '../middleware/roles.js'; // Asegúrate de tener un middleware para verificar el rol

const router = Router();

// Ruta para crear incidencia (solo para residentes)
router.post('/mis-incidencias', verifyToken, verificarRol('residente'), crearIncidencia);

// Ruta para obtener todas las incidencias (solo para admins)
router.get('/todas-las-incidencias', verifyToken, verificarRol('admin'), obtenerTodasIncidencias);

export default router;