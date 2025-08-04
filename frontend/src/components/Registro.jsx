import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/styles.css';

export default function Registro() {
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [errores, setErrores] = useState({
    nombre: false,
    apellido: false,
    email: false,
    password: false,
  });

  const [errorGeneral, setErrorGeneral] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const detectarCambios = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const validarTexto = (text) => {
    const regexTexto = /^[A-Za-zÀ-ÿ\s]+$/;
    return text.trim().length > 0 && regexTexto.test(text);
  };
  const validarEmail = (email) => /^[a-z0-9]+@(gmail|hotmail|outlook)\.com$/.test(email);
  const validarpassword = (contra) => contra.trim().length >= 6;

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setErrorGeneral("");
    setSuccessMsg("");

    const validoNombre = validarTexto(datos.nombre);
    const validoApellido = validarTexto(datos.apellido);
    const validoEmail = validarEmail(datos.email);
    const validopassword = validarpassword(datos.password);

    setErrores({
      nombre: !validoNombre,
      apellido: !validoApellido,
      email: !validoEmail,
      password: !validopassword,
    });

    if (!validoNombre || !validoApellido || !validoEmail || !validopassword) return;

    try {
      const res = await axios.post('http://localhost:3000/api/user/register', {
        first_name: datos.nombre,
        last_name: datos.apellido,
        username: datos.email,
        password: datos.password,
      });

      if (res.data.success) {
        setSuccessMsg("Usuario registrado correctamente. Redirigiendo...");
        setTimeout(() => navigate('http://localhost:3000/api/user/login'), 2000);
      } else {
        setErrorGeneral(res.data.message || "Error en el registro");
      }
    } catch (error) {
      if (error.response) {
        setErrorGeneral(error.response.data.error || "Error en el registro");
      } else {
        setErrorGeneral("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-box">
      <h1>Registro</h1>

      {errorGeneral && <p style={{ color: "red" }}>{errorGeneral}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <form onSubmit={enviarFormulario}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={datos.nombre}
          onChange={detectarCambios}
          required
        />
        {errores.nombre && <p style={{ color: "red" }}>Ingrese un nombre válido.</p>}

        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={datos.apellido}
          onChange={detectarCambios}
          required
        />
        {errores.apellido && <p style={{ color: "red" }}>Ingrese un apellido válido.</p>}

        <label>Correo Electrónico</label>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={datos.email}
          onChange={detectarCambios}
          required
        />
        {errores.email && <p style={{ color: "red" }}>Ingrese un correo electrónico válido.</p>}

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={datos.password}
          onChange={detectarCambios}
          required
        />
        {errores.password && <p style={{ color: "red" }}>La password debe tener al menos 6 caracteres.</p>}

        <button type="submit" style={{ marginTop: 10 }}>
          Registrarme
        </button>
      </form>
    </div>
    </div>
  );
}
