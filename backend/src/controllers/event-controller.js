import express from 'express';
import EventService from '../services/event-service.js';

const svc = new EventService();
const router = express.Router();

router.get('', async (req, res) => {
  let respuesta;
  const { name, startdate, tag } = req.query;
  let events;
  if (name || startdate || tag) {
    events = await svc.searchEvents({ name, startdate, tag });
  } else {
    events = await svc.getAllEvents();
  }
  if (events && events.length > 0) {
    respuesta = res.status(200).json(events);
  } else {
    respuesta = res.status(200).json({ error: 'Tal evento no está registrado' });
  }
  return respuesta;
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const event = await svc.getEventById(id);
  if (event) {
    return res.status(200).json(event);
  } else {
    return res.status(404).json({ error: 'Evento no encontrado' });
  }
});

export default router; 