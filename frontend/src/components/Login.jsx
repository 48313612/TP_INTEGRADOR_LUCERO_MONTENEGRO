import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  return (
    <> 
    <div>
      <h2>Login</h2>
      <form>
        <h1> Correo Electrónico </h1>
        <input type="email" placeholder="Correo electrónico" value={email} onChange={() => setEmail()} required />
        {errores.email && <p style={{ color: 'red' }}>ERROR. Ingrese un correo electrónico válido.</p>}

        <h1> Contraseña </h1>
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={() => setContraseña()} required />
        {errores.contraseña && <p style={{ color: 'red' }}>ERROR. Ingrese una contraseña válida.</p>}

        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    <div id="mensajeConfirmacion" style={{ color: 'green', display: 'none' }}>
        <p>Formulario enviado correctamente</p>
    </div>
    </>
  );
}
