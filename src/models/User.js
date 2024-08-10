// models/User.js
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import { DB_SECRET_KEY } from '../config/config.js';

// Crear usuario
export const crearUsuario = async (req, res) => {
    const { email, contraseña } = req.body;
    if (!email || !contraseña) {
        return res.status(400).json({ error: 'Email y Contraseña es Requerido' });
    }

    try {
        // Verificar si el email ya existe
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ error: 'Correo Existente' });
        }

        const hashcontraseña = await bcrypt.hash(contraseña, 10);
        const [result] = await db.execute('INSERT INTO usuarios (email, contraseña, rol) VALUES (?, ?, ?)', [email, hashcontraseña, 'residente']);

        const newUser = {
            id_usuario: result.insertId,
            email,
            contraseña: hashcontraseña,
            rol: 'residente'
        };
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

// Logear usuario
export const logearUsuario = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        if (!email || !contraseña) {
            return res.status(400).json({ error: 'Email y Contraseña es Requerido' });
        }

        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        const user = rows[0];
        if (!user) {
            return res.status(401).json({ error: 'Correo o Contraseña inválidos' });
        }

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(401).json({ error: 'Correo o Contraseña inválidos' });
        }

        const token = jwt.sign({ usuarioId: user.usuario_id, rol: user.rol }, DB_SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error al logear usuario:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

