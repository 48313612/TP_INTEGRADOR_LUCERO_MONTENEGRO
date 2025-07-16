import { useState } from "react";

export default function Login() {
  const [datos, setDatos] = useState({
    email: "",
    contraseña: "",
  });

  const [errores, setErrores] = useState({
    email: false,
    contraseña: false,
  });

  const detectarCambios = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const validarEmail = (email) => {
    return /^[a-z0-9]+@(gmail|hotmail|outlook)\.com$/.test(email);
  };

  const validarContraseña = (pass) => {
    return pass.trim().length >= 6;
  };

  const mostrarMensaje = () => {
    const elem = document.getElementById("mensajeConfirmacion");
    if (elem) elem.style.display = "block";
  };

  const ocultarMensaje = () => {
    const elem = document.getElementById("mensajeConfirmacion");
    if (elem) elem.style.display = "none";
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    const validoEmail = validarEmail(datos.email);
    const validoContraseña = validarContraseña(datos.contraseña);
    setErrores({
      email: !validoEmail,
      contraseña: !validoContraseña,
    });

    if (validoEmail && validoContraseña) {
      setErrorGeneral("");
      setDatos({
        email: "",
        contraseña: "",
      });
      mostrarMensaje();
      setTimeout(() => { ocultarMensaje(); }, 5000);
    }
  };

  return (
    <>
      <div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={enviarFormulario}>
        <label>Correo Electrónico</label>
        <input type="email" name="email" placeholder="Correo electrónico" value={datos.email} onChange={detectarCambios} required />
        {errores.email && ( <p style={{ color: "red" }}>Error. Ingrese un correo electrónico válido.</p> )}

        <label>Contraseña</label>
        <input type="password" name="contraseña" placeholder="Contraseña" value={datos.contraseña} onChange={detectarCambios} required  />
        {errores.contraseña && ( <p style={{ color: "red" }}> Error. La contraseña debe tener al menos 6 caracteres. </p> )}
        
        <button type="submit">Ingresar</button>
        </form>
      </div>
      <div id="mensajeConfirmacion" >
        <p>Formulario enviado correctamente</p>
      </div>
    </>
  );
}