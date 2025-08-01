import React, { useState } from "react";
import Login from "../components/Login";
import Registro from "../components/Registro";
import '../css/styles.css';

export default function AutenticacionUser() {
  const [modo, setModo] = useState("login");

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <button onClick={() => setModo("login")}>Iniciar Sesión</button>
        <button onClick={() => setModo("registro")}>Registrarse</button>
      </div>
      {modo === "login" ? <Login /> : <Registro />}
    </div>
  );
}
