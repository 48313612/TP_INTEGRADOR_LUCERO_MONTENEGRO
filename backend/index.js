import express from 'express';
import cors from 'cors';

const { getAllEvents } = './controllers/event';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/event', getAllEvents);

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
