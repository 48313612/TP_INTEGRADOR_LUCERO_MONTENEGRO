import express from 'express';
import UserService from '../services/user-service.js';

const router = express.Router();
const userService = new UserService();

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await userService.registerUser(req.body);
    return res.status(201).json({ message: 'Usuario registrado exitosamente.', user, token });
  } catch (err) {
    if (err.status && err.message) {
      return res.status(err.status).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Error en el servidor.' });
  }
});

export default router; 