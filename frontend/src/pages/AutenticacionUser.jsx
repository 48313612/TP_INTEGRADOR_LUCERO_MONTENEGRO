import React, { useState } from "react";
import Login from "../components/Login";
import Registro from "../components/Registro";
import '../css/styles.css';

export default function AutenticacionUser() {
  const [modo, setModo] = useState("login");

  return (
    <div className="container">
      <div className="section">
        <div className="container-sm">
          <div className="text-center mb-2xl">
            <h1>Autenticación</h1>
            <p className="text-muted">Accede a tu cuenta o crea una nueva</p>
          </div>

          <div className="card">
            <div className="flex justify-center mb-xl">
              <div className="flex bg-gray-100 rounded-lg p-sm">
                <button 
                  onClick={() => setModo("login")} 
                  className={`px-lg py-sm rounded-md transition-all ${
                    modo === "login" 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => setModo("registro")} 
                  className={`px-lg py-sm rounded-md transition-all ${
                    modo === "registro" 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Registrarse
                </button>
              </div>
            </div>
            
            {modo === "login" ? <Login /> : <Registro />}
          </div>
        </div>
      </div>
    </div>
  );
}
