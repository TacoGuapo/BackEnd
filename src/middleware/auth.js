import jwt from 'jsonwebtoken';
import { DB_SECRET_KEY } from '../config/config.js';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No se proporcionó token' });
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    jwt.verify(token, DB_SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado' });
            }
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded; // Asegúrate de que 'decoded' incluye 'usuarioId'
        next();
    });
};

export default verifyToken;