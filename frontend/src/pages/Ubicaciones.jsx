import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Ubicaciones() {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [nuevaUbicacion, setNuevaUbicacion] = useState({
    name: '',
    full_address: '',
    max_capacity: '',
    latitude: '',
    longitude: '',
    id_location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchUbicaciones = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/event-location', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUbicaciones(response.data);
      setError('');
    } catch (err) {
      console.error('Error al obtener ubicaciones:', err.response || err);
      setError('No se pudieron cargar las ubicaciones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const handleCrear = async () => {
    const { name, full_address, max_capacity, latitude, longitude, id_location } = nuevaUbicacion;

    if (!name || !full_address || !max_capacity || !latitude || !longitude || !id_location) {
      setError('Completá todos los campos antes de guardar.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/api/event-location',
        {
          name,
          full_address,
          max_capacity: parseInt(max_capacity, 10),
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          id_location: parseInt(id_location, 10)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNuevaUbicacion({
        name: '',
        full_address: '',
        max_capacity: '',
        latitude: '',
        longitude: '',
        id_location: ''
      });
      setError('');
      fetchUbicaciones();
    } catch (err) {
      console.error('Error al crear ubicación:', err.response || err);
      setError('No se pudo crear la ubicación.');
    }
  };

  return (
    <div className="container">
      <h2>Crear nueva ubicación de evento</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevaUbicacion.name}
          onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dirección completa"
          value={nuevaUbicacion.full_address}
          onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, full_address: e.target.value })}
        />
        <input
          type="number"
          placeholder="Capacidad máxima"
          value={nuevaUbicacion.max_capacity}
          onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, max_capacity: e.target.value })}
        />
        <input
          type="number"
          step="any"
          placeholder="Latitud"
          value={nuevaUbicacion.latitude}
          onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, latitude: e.target.value })}
        />
        <input
          type="number"
          step="any"
          placeholder="Longitud"
          value={nuevaUbicacion.longitude}
          onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, longitude: e.target.value })}
        />
        <input
          type="number"
          placeholder="ID de ubicación (location)"
          value={nuevaUbicacion.id_location}
          onChange={(e) => setNuevaUbicacion({ ...nuevaUbicacion, id_location: e.target.value })}
        />
        <button onClick={handleCrear}>Guardar ubicación</button>
      </div>

      <h3>Ubicaciones creadas</h3>
      {loading ? (
        <p>Cargando ubicaciones...</p>
      ) : ubicaciones.length === 0 ? (
        <p>No hay ubicaciones registradas aún.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {ubicaciones.map((ubi) => (
            <div key={ubi.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <strong>{ubi.name}</strong>
              <p>Dirección: {ubi.full_address}</p>
              <p>Capacidad máxima: {ubi.max_capacity}</p>
              <p>Latitud: {ubi.latitude}</p>
              <p>Longitud: {ubi.longitude}</p>
              <p>Provincia: {ubi.location?.province?.name || 'Sin provincia'}</p>
              <p>Localidad: {ubi.location?.name || 'Sin localidad'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
