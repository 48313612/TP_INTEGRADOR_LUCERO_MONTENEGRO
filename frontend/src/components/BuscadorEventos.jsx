import React, { useState } from 'react';
import EventoCard from '../components/EventoCard';

export default BuscadorEventos = () => {
  const [filtros, setFiltros] = useState({ name: '', startdate: '', tag: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  return (
    <div className="container">
      <h2>Buscar Eventos</h2>

      <div className="buscador-form">
        <input type="text" name="name" value={filtros.name} onChange={handleChange} />
        <input type="date" name="startdate" value={filtros.startdate} onChange={handleChange} />
        <input type="text" name="tag" value={filtros.tag} onChange={handleChange} />
        {/* <button onClick={buscarEventos}>Buscar</button> */}
      </div>

      <div className="buscador-resultados">
        {resultados.length === 0 ? (
          <p>No hay eventos que coincidan con la búsqueda.</p>
        ) : (
          resultados.map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))
        )}
      </div>
    </div>
  );
};