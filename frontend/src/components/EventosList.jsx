import React, { useEffect, useState } from 'react';
import EventoCard from '../components/EventoCard';
import axios from 'axios';

const EventosList = () => {
  const [eventos, setEventos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(true);
  const limite = 5;

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const res = await axios.get(`/api/event?page=${pagina}&limit=${limite}`);
        setEventos(res.data);
        setHayMas(res.data.length === limite);
      } catch (error) {
        console.error("Error al obtener eventos:", error);
        setEventos([]);
      }
    };

    obtenerEventos();
  }, [pagina]);

  const paginaAnterior = () => {
    if (pagina > 1) setPagina(pagina - 1);
  };

  const paginaSiguiente = () => {
    if (hayMas) setPagina(pagina + 1);
  };

  return (
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
        <button onClick={paginaAnterior} className="boton-paginacion" disabled={pagina === 1}>
          Anterior
        </button>
        <button onClick={paginaSiguiente} className="boton-paginacion" disabled={!hayMas}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default EventosList;