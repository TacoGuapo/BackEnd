
import { Router } from 'express';
import { crearIncidencia, obtenerTodasIncidencias, obtenerMisIncidencias, actualizarEstadoIncidencia } from '../controllers/incidencia.controller.js';
import { crearUsuario, logearUsuario } from '../models/User.js';
import { manejarErrorArchivo } from '../helper.js'
import  verifyToken from '../middleware/auth.js';
import userController from '../controllers/user.controller.js';
import { verificarRol } from '../middleware/roles.js'; // Asegúrate de tener un middleware para verificar el rol

const router = Router();

router.post('/login', logearUsuario, userController.login); 
router.post('/registrarse', crearUsuario, manejarErrorArchivo, userController.createUser);
router.post('/mis-incidencias', verifyToken, verificarRol('residente'), crearIncidencia);
router.get('/mis-incidencias', verifyToken, verificarRol('residente'), obtenerMisIncidencias);

// Ruta para obtener todas las incidencias (solo para admins)
router.get('/todas-las-incidencias', verifyToken, verificarRol('admin'), obtenerTodasIncidencias);
router.get('/me', verifyToken, userController.getUsuario);
router.put('/incidencia/:id', verifyToken, verificarRol('admin'), actualizarEstadoIncidencia);
// router.put('/usuario', verifyToken, userController.updateUsuarioController);
// router.post('/mis-incidencias');
// router.get('/todas-las-incidencias');

export default router;
