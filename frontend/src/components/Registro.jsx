import { useState } from "react";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  return (
    <> 
    <div>
      <h2>Registro</h2>
      <form>
        <h1> Nombre </h1>
        <input type="text" placeholder="Nombre" value={nombre} onChange={() => setNombre()} required />
        {errores.nombre && <p style={{ color: 'red' }}>Error. Ingrese un nombre válido.</p>}

        <h1> Apellido </h1>
        <input type="text" placeholder="Apellido" value={apellido} onChange={() => setApellido()} required />
        {errores.apellido && <p style={{ color: 'red' }}>Error. Ingrese un apellido válido.</p>}

        <h1> Correo Electrónico </h1>
        <input type="email" placeholder="Correo electrónico" value={email} onChange={() => setEmail()} required />
        {errores.email && <p style={{ color: 'red' }}>Error. Ingrese un correo electrónico válido.</p>}

        <h1> Contraseña </h1>
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={() => setContraseña()} required />
        {errores.contraseña && <p style={{ color: 'red' }}>Error. Ingrese una contraseña válida.</p>}

        <button type="submit">Registrarme</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    <div id="mensajeConfirmacion" style={{ color: 'green', display: 'none' }}>
        <p>Formulario enviado correctamente</p>
    </div>
    </>
  );
}
