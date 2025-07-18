import React, { useState } from 'react';

export default CrearEventoForm = () => {
  const [formData, setFormData] = useState({
  nombre: '', descripcion: '', fecha: '', lugar: '', precio: '', capacidad: '', duracion: '', provincia: '', localidad: '', tags: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validar = () => {
    const { nombre, fecha, lugar, precio, duracion } = formData;
    if (!nombre || !fecha || !lugar || !precio || !duracion) {
      setError('Por favor completá todos los campos obligatorios.');
      return false;
    }
    if (precio <= 0 || duracion <= 0) {
      setError('Precio y duración deben ser mayores que 0.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;
  };

  return (
    <div className="form-container">
      <h2>Crear nuevo evento</h2>
      {error && <p className="error">{error}</p>}
      {mensaje && <p className="success">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="crear-evento-form">
        <input name="nombre" value={formData.nombre} onChange={handleChange} />
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
        <input name="lugar" value={formData.lugar} onChange={handleChange} />
        <input type="number" name="precio" value={formData.precio} onChange={handleChange} />
        <input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} />
        <input type="number" name="duracion" value={formData.duracion} onChange={handleChange} />
        <input name="provincia" value={formData.provincia} onChange={handleChange} />
        <input name="localidad" value={formData.localidad} onChange={handleChange} />
        <input name="tags" value={formData.tags} onChange={handleChange} />
        <button type="submit" className="btn-crear">Crear evento</button>
      </form>
    </div>
  );
};