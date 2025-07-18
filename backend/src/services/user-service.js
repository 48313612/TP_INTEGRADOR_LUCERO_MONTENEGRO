import UserRepository from '../repositories/user-repository.js';
import User from '../entities/user.js';
import { validarUser, validarTexto, validarContrasena } from '../helpers/validaciones.js';
import jwt from 'jsonwebtoken';

const repo = new UserRepository();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export default class UserService {
  async registerUser({ first_name, last_name, username, password }) {
    const nombreError = validarTexto(first_name);
    if (nombreError) {
      throw { status: 400, message: nombreError };
    }
    const apellidoError = validarTexto(last_name);
    if (apellidoError) {
      throw { status: 400, message: apellidoError };
    }
    const emailError = validarUser(username);
    if (emailError) {
      throw { status: 400, message: emailError };
    }
    const contrasenaError = validarContrasena(password)
    if (contrasenaError) {
      throw { status: 400, message: contrasenaError };
    }
    const existing = await repo.getUserByUsername(username);
    if (existing) {
      throw { status: 400, message: 'El usuario ya existe.' };
    }
    const newUser = new User({ first_name, last_name, username, password });
    const createdUser = await repo.createUser(newUser);
    // Generar token JWT
    const token = jwt.sign(
      { id: createdUser.id, username: createdUser.username, first_name: createdUser.first_name, last_name: createdUser.last_name },
      JWT_SECRET,
      { expiresIn: '2h' }
    );
    return { user: createdUser, token };
  }
} 