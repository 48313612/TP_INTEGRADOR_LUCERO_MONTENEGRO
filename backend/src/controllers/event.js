import { getAllEventsFromDB, searchEventsInDB } from '../repositories/eventRepository.js';

export const getAllEvents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const events = await getAllEventsFromDB(limit, offset);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const searchEvents = async (req, res) => {
  try {
    const filters = {
      name: req.query.name || null,
      startdate: req.query.startdate || null,
      tag: req.query.tag || null,
    };

    const events = await searchEventsInDB(filters);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error al buscar eventos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
