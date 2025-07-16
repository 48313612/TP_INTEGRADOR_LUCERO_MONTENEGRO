import React, { useState } from "react";

export default function Registro() {
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
  });

  const [errores, setErrores] = useState({
    nombre: false,
    apellido: false,
    email: false,
    contraseña: false,
  });

  const detectarCambios = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const validarTexto = (text) => {
    const regexTexto = /^[A-Za-zÀ-ÿ\s]+$/;
    return text.trim().length > 0 && regexTexto.test(text);
  };
  const validarEmail = (email) => {
    return /^[a-z0-9]+@(gmail|hotmail|outlook)\.com$/.test(email);
  };
  const validarContraseña = (contra) => {
    return contra.trim().length >= 6;
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
    const validoNombre = validarTexto(datos.nombre);
    const validoApellido = validarTexto(datos.apellido);
    const validoEmail = validarEmail(datos.email);
    const validoContraseña = validarContraseña(datos.contraseña);

    setErrores({
      nombre: !validoNombre,
      apellido: !validoApellido,
      email: !validoEmail,
      contraseña: !validoContraseña,
    });

    if (validoNombre && validoApellido && validoEmail && validoContraseña) {
      setDatos({
        nombre: "",
        apellido: "",
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
        <h2>Registro</h2>
        <form onSubmit={enviarFormulario}>
          <label>Nombre</label>
          <input type="text" name="nombre" placeholder="Nombre" value={datos.nombre} onChange={detectarCambios} required />
          {errores.nombre && ( <p style={{ color: "red" }}>Error. Ingrese un nombre válido.</p> )}

          <label>Apellido</label>
          <input type="text" name="apellido" placeholder="Apellido" value={datos.apellido} onChange={detectarCambios} required />
          {errores.apellido && ( <p style={{ color: "red" }}>Error. Ingrese un apellido válido.</p> )}

          <label>Correo Electrónico</label>
          <input type="email" name="email" placeholder="Correo electrónico" value={datos.email} onChange={detectarCambios} required />
          {errores.email && ( <p style={{ color: "red" }}>Error. Ingrese un correo electrónico válido.</p> )}

          <label>Contraseña</label>
          <input type="password" name="contraseña" placeholder="Contraseña" value={datos.contraseña} onChange={detectarCambios} required  />
          {errores.contraseña && ( <p style={{ color: "red" }}> Error. La contraseña debe tener al menos 6 caracteres. </p> )}

          <button type="submit">Registrarme</button>
        </form>
      </div>
      
      <div id="mensajeConfirmacion" >
        <p>Formulario enviado correctamente</p>
      </div>
    </>
  );
}