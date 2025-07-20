import AuthService from '../services/auth-service.js';

const authService = new AuthService();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token de acceso requerido."
        });
    }
    
    try {
        const decoded = authService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Token inválido o expirado."
        });
    }
};

export default authenticateToken; 