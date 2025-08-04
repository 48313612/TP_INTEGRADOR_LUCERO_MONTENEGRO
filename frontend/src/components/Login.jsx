import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/styles.css';

export default function Login() {
  const [datos, setDatos] = useState({ email: "", contraseña: "" });
  const [errores, setErrores] = useState({ email: false, contraseña: false });
  const [errorGeneral, setErrorGeneral] = useState("");
  const navigate = useNavigate();

  const detectarCambios = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const validarEmail = (email) =>
    /^[a-z0-9]+@(gmail|hotmail|outlook)\.com$/.test(email);
  const validarContraseña = (pass) => pass.trim().length >= 4;

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setErrorGeneral("");
    const validoEmail = validarEmail(datos.email);
    const validoContraseña = validarContraseña(datos.contraseña);
    setErrores({
      email: !validoEmail,
      contraseña: !validoContraseña,
    });

    if (!validoEmail || !validoContraseña) return;

    try {
      const res = await axios.post('http://localhost:3000/api/user/login', {
        username: datos.email,
        password: datos.contraseña,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate('/');
      } else {
        setErrorGeneral(res.data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      if (error.response) {
        setErrorGeneral(error.response.data.message || "Error en la autenticación");
      } else {
        setErrorGeneral("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-box">
      <h1>Iniciar Sesión</h1>

      {errorGeneral && <p style={{ color: "red" }}>{errorGeneral}</p>}

      <form onSubmit={enviarFormulario} >
        <label>Correo Electrónico</label>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={datos.email}
          onChange={detectarCambios}
          required
        />
        {errores.email && (
          <p style={{ color: "red" }}>Ingrese un correo electrónico válido.</p>
        )}

        <label>Contraseña</label>
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={datos.contraseña}
          onChange={detectarCambios}
          required
        />
        {errores.contraseña && (
          <p style={{ color: "red" }}>
            La contraseña debe tener al menos 4 caracteres.
          </p>
        )}

        <button type="submit"> Ingresar </button>
      </form>
      </div>
    </div>
  );
}
