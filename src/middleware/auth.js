import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'Akses ditolak. Token tidak ditemukan.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token tidak valid' });
    }
};