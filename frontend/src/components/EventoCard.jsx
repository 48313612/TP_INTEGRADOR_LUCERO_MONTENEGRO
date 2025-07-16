import React from 'react';

export default EventoCard = ({ evento }) => {
  const { name, description, start_date, duration_in_minutes, price, max_assistance, enabled_for_enrollment } = evento;

  return (
    <div className="evento-card">
      <h3>{name}</h3>
      <p>Descripción: {description}</p>
      <p>Fecha de inicio: {new Date(start_date).toLocaleString()}</p>
      <p>Duración: {duration_in_minutes} minutos</p>
      <p>Precio: ${price}</p>
      <p>Capacidad máxima: {max_assistance} personas</p>
      <p>Inscripción habilitada: {enabled_for_enrollment ? 'Sí' : 'No'}</p>
    </div>
  );
};