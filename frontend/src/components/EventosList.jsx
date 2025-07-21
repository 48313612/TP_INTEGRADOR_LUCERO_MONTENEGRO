import React from 'react';
import EventoCard from '../components/EventoCard';

export default EventosList = () => {
  return (
    <>
      <div className="container">
        <h1>Eventos Disponibles</h1>

        {eventos.length === 0 ? (
          <p>No hay eventos para mostrar.</p>
        ) : (
          <div className="eventos-grid">
            {eventos.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </div>
        )}

        <div className="paginacion-botones">
          <button className="boton-paginacion">Anterior</button>
          <button className="boton-paginacion">Siguiente</button>
        </div>
      </div>
    </>
  );
};