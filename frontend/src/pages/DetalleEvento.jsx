import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DetalleEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [error, setError] = useState('');
  const [inscripto, setInscripto] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await axios.get(`/api/event/${id}`);
        setEvento(res.data);

        if (token) {
          const inscripcion = await axios.get(`/api/user/me/enrollments`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const estaInscripto = inscripcion.data.some(ev => ev.id === res.data.id);
          setInscripto(estaInscripto);
        }
      } catch (err) {
        setError('Error al obtener el evento');
      }
    };

    fetchEvento();
  }, [id, token]);

  const manejarInscripcion = async () => {
    try {
      if (!token) return alert('Inicia sesión para inscribirte');

      if (!inscripto) {
        await axios.post(`/api/event/${id}/enrollment`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInscripto(true);
      } else {
        await axios.delete(`/api/event/${id}/enrollment`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInscripto(false);
      }
    } catch (err) {
      setError('Error al inscribirse o cancelar');
    }
  };

  if (error) return <div>{error}</div>;
  if (!evento) return <div>Cargando evento...</div>;

  const { name, description, start_date, duration_in_minutes, price, creator_user, event_location, tags } = evento;

  return (
    <div className="detalle-container">
      <button className="volver" onClick={() => navigate('/')}>⬅ Volver</button>
      <h2>{name}</h2>
      <p><strong>Descripción:</strong> {description}</p>
      <p><strong>Fecha:</strong> {new Date(start_date).toLocaleString()}</p>
      <p><strong>Duración:</strong> {duration_in_minutes} minutos</p>
      <p><strong>Precio:</strong> ${price}</p>
      <p><strong>Tags:</strong> {tags}</p>
      <p><strong>Provincia:</strong> {event_location?.location?.province?.name}</p>
      <p><strong>Localidad:</strong> {event_location?.location?.name}</p>
      <p><strong>Dirección:</strong> {event_location?.full_address}</p>
      <p><strong>Organizado por:</strong> {creator_user?.first_name} {creator_user?.last_name} (@{creator_user?.username})</p>

      {token && (
        <button className="btn-inscripcion" onClick={manejarInscripcion}>
          {inscripto ? 'Cancelar inscripción' : 'Inscribirme'}
        </button>
      )}
    </div>
  );
}
