import pool  from '../config/db.js';

// Crear incidencia


export const crearIncidencia = async (req, res) => {
    const { asunto, tipo, descripcion } = req.body;
    const usuario_id = req.user.usuarioId;

    console.log({ usuario_id, asunto, tipo, descripcion }); // Verifica los valores

    if (!asunto || !tipo || !descripcion) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        const [result] = await pool.execute(
            'INSERT INTO incidencias (usuario_id, asunto, tipo, descripcion, estado, fecha_creacion) VALUES (?, ?, ?, ?, "pendiente", NOW())',
            [usuario_id, asunto, tipo, descripcion]
        );

        const nuevaIncidencia = {
            id_incidencia: result.insertId,
            usuario_id,
            asunto,
            tipo,
            descripcion,
            estado: 'pendiente',
            fecha_creacion: new Date().toISOString()
        };

        res.status(201).json(nuevaIncidencia);
    } catch (error) {
        console.error('Error al crear incidencia:', error);
        res.status(500).json({ error: 'Error al crear incidencia' });
    }
};

// Obtener todas las incidencias (para admin)
export const obtenerTodasIncidencias = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM incidencias');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener incidencias:', error);
        res.status(500).json({ error: 'Error al obtener incidencias' });
    }
};

// Obtener incidencias del usuario logueado
export const obtenerMisIncidencias = async (req, res) => {
    const usuario_id = req.user.usuarioId;

    try {
        const [rows] = await pool.execute('SELECT * FROM incidencias WHERE usuario_id = ?', [usuario_id]);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener incidencias del usuario:', error);
        res.status(500).json({ error: 'Error al obtener incidencias del usuario' });
    }
};

export const actualizarEstadoIncidencia = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ['pendiente', 'en proceso', 'concluido'];

    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ error: 'Estado no válido' });
    }

    try {
        const [result] = await pool.execute(
            'UPDATE incidencias SET estado = ? WHERE id_incidencia = ?',
            [estado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Incidencia no encontrada' });
        }

        res.status(200).json({ message: 'Estado actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar estado de incidencia:', error);
        res.status(500).json({ error: 'Error al actualizar estado de incidencia' });
    }
};