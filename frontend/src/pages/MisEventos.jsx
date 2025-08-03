import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventoCard from '../components/EventoCard';
import '../css/styles.css';

export default function MisEventos() {
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMisEventos = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No estás autenticado. Iniciá sesión para ver tus eventos.');
        setLoading(false);
        return;
      }

      try {
        console.log('Token usado:', token);
        const response = await axios.get('http://localhost:3000/api/event/mis-eventos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Eventos recibidos:', response.data);

        if (Array.isArray(response.data)) {
          setEventos(response.data);
        } else if (response.data && Array.isArray(response.data.events)) {
          // Por si la respuesta viene anidada { events: [...] }
          setEventos(response.data.events);
        } else {
          setEventos([]);
          setError('Respuesta inesperada del servidor');
        }
      } catch (err) {
        console.error('Error en fetchMisEventos:', err.response || err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('No estás autorizado. Verificá tu sesión.');
        } else {
          setError('No se pudieron cargar tus eventos.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMisEventos();
  }, []);

  return (
    <div className="container">
      <h1>Mis Eventos</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : eventos.length === 0 ? (
        <p>No creaste ningún evento aún.</p>
      ) : (
        <div className="eventos-grid">
          {eventos.map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
        </div>
      )}
    </div>
  );
}
