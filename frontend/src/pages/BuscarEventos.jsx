import React, { useState, useEffect } from 'react';
import EventoCard from '../components/EventoCard';
import '../css/styles.css';

export default function BuscarEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [tag, setTag] = useState('');

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchEventos = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (name) queryParams.append('name', name);
      if (startDate) queryParams.append('start_date', startDate);
      if (tag) queryParams.append('tag', tag);
      queryParams.append('page', page);

      const res = await fetch(`http://localhost:3000/api/event?${queryParams.toString()}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setEventos(data);
        setHasMore(data.length > 0);
      }
      else {
        console.error('Error:', data.error || data);
      }
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, [page]);

  const handleFiltrar = (e) => {
    e.preventDefault();
    setPage(1);
    fetchEventos();
  };

  return (
    <div className="buscador">
      <h1>Buscar Eventos</h1>
      <div className="formBuscar">
      <form onSubmit={handleFiltrar} className="filtros-form">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <button type="submit">Filtrar</button>
      </form>
      </div>

      {loading ? (
        <p>Cargando eventos...</p>
      ) : eventos.length === 0 ? (
        <p>No hay eventos disponibles.</p>
      ) : (
        <div className="cards-row-container">
          {eventos.map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
        </div>
      )}

      <div className="paginacion-botones">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span style={{ margin: '0 10px' }}>Página {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasMore || eventos.length === 0}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}