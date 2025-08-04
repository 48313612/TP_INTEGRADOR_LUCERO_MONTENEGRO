import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../css/styles.css';

export default function MisEventos() {
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editandoId, setEditandoId] = useState(null);
  const [eventoEditado, setEventoEditado] = useState({});

  useEffect(() => {
    const fetchMisEventos = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No estás autenticado. Iniciá sesión para ver tus eventos.');
        setLoading(false);
        return;
      }

      let userId;
      try {
        const decoded = jwtDecode(token);
        userId = decoded.id;
      } catch (err) {
        setError('Token inválido.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/event/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const eventosDelUsuario = response.data.filter(
          (evento) => evento.creator_user?.id === userId
        );

        setEventos(eventosDelUsuario);
      } catch (err) {
        setError('No se pudieron cargar tus eventos.');
      } finally {
        setLoading(false);
      }
    };

    fetchMisEventos();
  }, []);

  const handleEliminar = async (id) => {
    const confirm = window.confirm('¿Estás seguro de que querés eliminar este evento?');
    if (!confirm) return;

    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:3000/api/event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEventos(eventos.filter((e) => e.id !== id));
    } catch (err) {
      alert('Error al eliminar el evento.');
    }
  };

  const handleEditar = (evento) => { setEditandoId(evento.id); setEventoEditado({ ...evento }); };

  const handleGuardar = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:3000/api/event/', eventoEditado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEventos(eventos.map((e) => (e.id === eventoEditado.id ? eventoEditado : e)));
      setEditandoId(null);
    } catch (err) {
      alert('Error al guardar los cambios.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventoEditado({ ...eventoEditado, [name]: value });
  };

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
            <div key={evento.id} className="evento-card">
              {editandoId === evento.id ? (
                <div className="formulario">
                  <input name="name" value={eventoEditado.name} onChange={handleChange} placeholder="Nombre" />
                  <textarea name="description" value={eventoEditado.description} onChange={handleChange} placeholder="Descripción" />
                  <input type="date" name="start_date" value={eventoEditado.start_date?.slice(0, 10)} onChange={handleChange} />
                  <input name="duration_in_minutes" type="number" value={eventoEditado.duration_in_minutes} onChange={handleChange} placeholder="Duración" />
                  <input name="price" type="number" value={eventoEditado.price} onChange={handleChange} placeholder="Precio" />
                  <button onClick={handleGuardar}>Guardar</button>
                  <button onClick={() => setEditandoId(null)}>Cancelar</button>
                </div>
              ) : (
                <>
                  <h3>{evento.name}</h3>
                  <p>{evento.description}</p>
                  <p>Fecha: {new Date(evento.start_date).toLocaleDateString()}</p>
                  <p>Duración: {evento.duration_in_minutes} minutos</p>
                  <p>Precio: ${evento.price}</p>
                  <button onClick={() => handleEditar(evento)}>Editar</button>
                  <button onClick={() => handleEliminar(evento.id)}>Eliminar</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}