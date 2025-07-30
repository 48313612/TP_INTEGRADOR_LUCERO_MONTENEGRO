import React, { useState } from "react";
import Login from "../components/Login";
import Registro from "../components/Registro";

export default function AutenticacionUser() {
  const [modo, setModo] = useState("login");

  return (
    <div>
      <div>
        <button onClick={() => setModo("login")}> Iniciar Sesión </button>
        <button onClick={() => setModo("registro")} > Registrarse </button>
      </div>
      {modo === "login" ? <Login /> : <Registro />}
    </div>
  );
}