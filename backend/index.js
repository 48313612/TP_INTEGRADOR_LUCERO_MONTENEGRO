import express from 'express';
import cors from 'cors';
import { getAllEvents, searchEvents } from './controllers/event.js';

const app = express();
const port = process.env.PORT || 5432;

app.use(cors());
app.use(express.json());

app.get('/api/event', getAllEvents);
app.get('/api/event/search', searchEvents);

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
