import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CrearEventoForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    duracion: "",
    precio: "",
    max_assistance: "",
    enabled_for_enrollment: true,
    id_event_location: "",
  });

  const [ubicaciones, setUbicaciones] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/event-location", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUbicaciones(res.data);
      } catch (err) {
        console.error("Error cargando ubicaciones", err);
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (
      !formData.nombre ||
      !formData.fecha ||
      !formData.duracion ||
      !formData.precio ||
      !formData.id_event_location
    ) {
      setError("Por favor completá todos los campos obligatorios");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Decodificar token y extraer el id del usuario
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      const body = {
        name: formData.nombre,
        description: formData.descripcion,
        start_date: formData.fecha,
        duration_in_minutes: parseInt(formData.duracion, 10),
        price: parseFloat(formData.precio),
        enabled_for_enrollment: formData.enabled_for_enrollment,
        max_assistance:
          formData.max_assistance !== ""
            ? parseInt(formData.max_assistance, 10)
            : null,
        id_event_location: parseInt(formData.id_event_location, 10),
        creator_user: userId // ✅ Esto es lo que agregamos
      };

      const res = await axios.post('http://localhost:3000/api/event', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        setMensaje("Evento creado con éxito");
        setFormData({
          nombre: "",
          descripcion: "",
          fecha: "",
          duracion: "",
          precio: "",
          max_assistance: "",
          enabled_for_enrollment: true,
          id_event_location: "",
        });
      }
    } catch (error) {
      setError(error.response?.data?.error || "Error al crear el evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        placeholder="Nombre*"
        value={formData.nombre}
        onChange={handleChange}
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
      />
      <input
        type="datetime-local"
        name="fecha"
        placeholder="Fecha*"
        value={formData.fecha}
        onChange={handleChange}
      />
      <input
        type="number"
        name="duracion"
        placeholder="Duración (minutos)*"
        value={formData.duracion}
        onChange={handleChange}
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio*"
        value={formData.precio}
        onChange={handleChange}
      />
      <input
        type="number"
        name="max_assistance"
        placeholder="Capacidad máxima"
        value={formData.max_assistance}
        onChange={handleChange}
      />
      <label>
        Habilitado para inscripción
        <input
          type="checkbox"
          name="enabled_for_enrollment"
          checked={formData.enabled_for_enrollment}
          onChange={handleChange}
        />
      </label>

      <select
        name="id_event_location"
        value={formData.id_event_location}
        onChange={handleChange}
        required
      >
        <option value="">Seleccioná una ubicación</option>
        {ubicaciones.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name} - {loc.full_address}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Creando..." : "Crear evento"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
    </form>
  );
}
