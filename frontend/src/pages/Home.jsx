import React, { useState } from 'react';
import EventoCard from '../components/EventoCard';

export default function Home() {
  const [eventos, setEventos] = useState([]);
  return (
    <>
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
    </>
  );
}