import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/user-repository.js';

class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
        this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    }

    generateToken(user) {
        const payload = {
            id: user.id,
            first_name: user.first_name,
            username: user.username
        };
        
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '24h' });
    }

    async register(userData) {
        const { first_name, last_name, username, password } = userData;
        
        // Validations
        if (!first_name || first_name.trim().length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }
        
        if (!last_name || last_name.trim().length < 3) {
            throw new Error('El apellido debe tener al menos 3 caracteres.');
        }
        
        if (!this.isValidEmail(username)) {
            throw new Error('El email es invalido.');
        }
        
        if (!password || password.trim().length < 3) {
            throw new Error('La contraseña debe tener al menos 3 caracteres.');
        }
        
        // Check if username already exists
        const userExists = await this.userRepository.checkUsernameExists(username);
        if (userExists) {
            throw new Error('El usuario ya existe.');
        }
        
        // Create user
        const newUser = await this.userRepository.createUser(userData);
        return newUser;
    }

    async login(credentials) {
        const { username, password } = credentials;
        
        // Validate email format
        if (!this.isValidEmail(username)) {
            throw new Error('El email es invalido.');
        }
        
        // Find user
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            throw new Error('Usuario o clave inválida.');
        }
        
        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Usuario o clave inválida.');
        }
        
        // Generate token
        const token = this.generateToken(user);
        
        return {
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username
            },
            token
        };
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            throw new Error('Token inválido.');
        }
    }
}

export default AuthService; 