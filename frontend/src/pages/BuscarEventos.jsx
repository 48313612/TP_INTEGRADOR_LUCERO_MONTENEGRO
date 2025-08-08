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
  const [viewAll, setViewAll] = useState(false);
  const limite = 6;

  const fetchEventos = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (name) queryParams.append('name', name);
      if (startDate) queryParams.append('startdate', startDate);
      if (tag) queryParams.append('tag', tag);
      
      if (viewAll) {
        queryParams.append('all', 'true');
      } else {
        queryParams.append('page', page);
        queryParams.append('limit', limite);
      }

      const res = await fetch(`http://localhost:3000/api/event?${queryParams.toString()}`);
      const data = await res.json();

      // Handle the new response format
      if (data.data && Array.isArray(data.data)) {
        setEventos(data.data);
        if (!viewAll) {
          setHasMore(page < data.pagination?.totalPages);
        } else {
          setHasMore(false);
        }
      } else if (data.error) {
        console.error('Error:', data.error);
        setEventos([]);
        setHasMore(false);
      } else {
        console.error('Error:', data.error || data);
        setEventos([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      setEventos([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, [page, name, startDate, tag, viewAll]);

  const handleFiltrar = (e) => {
    e.preventDefault();
    setPage(1);
  };

  // Mostrar paginación si hay eventos y hay más páginas o estamos en una página > 1
  const mostrarPaginacion = eventos.length > 0 && (hasMore || page > 1);

  return (
    <div className="container">
      <div style={{
        width: '100%',
        height: '220px',
        backgroundImage: 'url(https://indiehoy.com/wp-content/uploads/2018/09/49-cutcopy_matiascasalh-7.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '18px',
        marginBottom: '2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
      }} />
      <div className="section">
        <div className="text-center mb-2xl">
          <h1>Buscar Eventos</h1>
          <p className="text-muted">Encuentra eventos que se adapten a tus intereses</p>
        </div>

        {/* Filtros */}
        <div className="card mb-2xl">
          <form onSubmit={handleFiltrar}>
            <div className="grid grid-cols-3 gap-lg">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nombre del Evento</label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Buscar por nombre..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="startDate" className="form-label">Fecha</label>
                <input
                  id="startDate"
                  type="date"
                  className="form-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tag" className="form-label">Etiqueta</label>
                <input
                  id="tag"
                  type="text"
                  className="form-input"
                  placeholder="Buscar por etiqueta..."
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Buscar Eventos
              </button>
            </div>
          </form>
        </div>

        {/* Resultados */}
        {loading ? (
          <div className="text-center">
            <div className="loading"></div>
            <p className="text-muted mt-md">Buscando eventos...</p>
          </div>
        ) : eventos.length === 0 ? (
          <div className="text-center">
            <div className="card">
              <h3>No se encontraron eventos</h3>
              <p className="text-muted">Intenta ajustar los filtros de búsqueda.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-xl">
            {eventos.map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </div>
        )}

        {/* Paginación */}
        {mostrarPaginacion && (
          <div className="flex justify-center gap-md mt-2xl">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="btn btn-secondary"
              disabled={page === 1}
            >
              Anterior
            </button>
            <span className="flex items-center px-md">
              Página {page}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="btn btn-secondary"
              disabled={!hasMore}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}