import express from 'express';
import * as EventService from '../services/event-service.js';

const svc = new EventService();
const router = express.Router();

router.get('', async (req, res) => {
  let respuesta;
  const events = await svc.getAllEvents();
  if (events != null) {
    respuesta = res.status(200).json(events);
  }
  else{
    respuesta= res.status(500).json({ error: 'Error al obtener eventos' });
  }
  return respuesta;
});

export default router; 