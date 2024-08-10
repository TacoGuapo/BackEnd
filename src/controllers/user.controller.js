// controllers/user.controller.js

import { crearUsuario, logearUsuario } from '../models/User.js';

const createUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Se necesita Email y Contraseña!' });
    }

    try {
        const result = await crearUsuario(req, res);
        if (result.error) {
            return res.status(result.status || 500).json(result);
        }
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, message: 'Error interno al crear usuario', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Se necesita Email y Contraseña!' });
    }
    try {
        const result = await logearUsuario(req, res);
        return res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({ success: false, status: 500, message: 'Error interno al iniciar sesión', error: error.message });
    }
};

const getUsuario = async (req, res) => {
    try {
     
      const userId = req.user.id; 
      const user = await user.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      
      res.json({ name: user.name, email: user.email });
    } catch (err) {
      res.status(500).json({ message: 'Error obteniendo información del usuario' });
    }
  };

export default { createUser, login, getUsuario };
