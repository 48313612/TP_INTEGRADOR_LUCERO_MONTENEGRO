import React, { useState, useEffect } from 'react';
import EventoCard from '../components/EventoCard';
import axios from 'axios';
import '../css/styles.css';

export default function Home() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/event')
        if (Array.isArray(response.data)) {
          setEventos(response.data);
        } else {
          console.error('Respuesta inesperada del servidor:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  return (
    <div className="container">
      <h1>Listado de Eventos</h1>
      {eventos.length === 0 ? (
        <p>No hay eventos disponibles.</p>
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
