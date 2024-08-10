export const verificarRol = (rol) => {
    return (req, res, next) => {
        if (req.user && req.user.rol === rol) {
            return next();
        } else {
            return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta' });
        }
    };
};