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
  const userId = localStorage.getItem('userId'); // ⚠️ Este ID debe guardarse al hacer login

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/event/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setEvento(res.data);
        setInscripto(res.data.user_enrolled || false); // Requiere que el backend lo devuelva
      } catch (err) {
        console.log(err);
        setError('Error al obtener el evento');
      }
    };

    fetchEvento();
  }, [id, token]);

  const manejarInscripcion = async () => {
    try {
      if (!token) {
        alert('Inicia sesión para inscribirte');
        return;
      }

      if (!inscripto) {
        await axios.post(`http://localhost:3000/api/event/${id}/enrollment`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInscripto(true);
        setError('');
      } else {
        await axios.delete(`http://localhost:3000/api/event/${id}/enrollment`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInscripto(false);
        setError('');
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      const msg = err.response?.data?.error;

      // Detectar intento de inscripción a evento propio
      if (msg === 'No puedes inscribirte a tu propio evento') {
        setError('No puedes inscribirte a tu propio evento.');
      } else {
        setError(msg || 'Error al inscribirse o cancelar');
      }
    }
  };

  if (!evento) return <div>Cargando evento...</div>;

  const {
    name,
    description,
    start_date,
    duration_in_minutes,
    price,
    creator_user,
    event_location,
    tags,
  } = evento;

  const esCreador = creator_user?.id === Number(userId);

  return (
    <div className="detalle-container">
      <button className="volver" onClick={() => navigate('/')}>Volver</button>
      <h2>{name}</h2>
      <p><strong>Descripción:</strong> {description}</p>
      <p><strong>Fecha:</strong> {new Date(start_date).toLocaleString()}</p>
      <p><strong>Duración:</strong> {duration_in_minutes} minutos</p>
      <p><strong>Precio:</strong> ${price}</p>
      <p><strong>Tags:</strong> {tags && tags.map(tag => tag.name).join(', ')}</p>
      <p><strong>Provincia:</strong> {event_location?.location?.province?.name}</p>
      <p><strong>Localidad:</strong> {event_location?.location?.name}</p>
      <p><strong>Dirección:</strong> {event_location?.full_address}</p>
      <p><strong>Organizado por:</strong> {creator_user?.first_name} {creator_user?.last_name} (@{creator_user?.username})</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {token && !esCreador && (
        <button className="btn-inscripcion" onClick={manejarInscripcion}>
          {inscripto ? 'Cancelar inscripción' : 'Inscribirme'}
        </button>
      )}

      {token && esCreador && (
        <p><em>No puedes inscribirte a tu propio evento.</em></p>
      )}
    </div>
  );
}
