import React from 'react';
import { Link } from "react-router-dom";
import AutenticacionUser from '../pages/AutenticacionUser'
import BuscarEventos from '../pages/BuscarEventos.jsx'
import CrearEventoForm from '../pages/CrearEventoForm.jsx'
import EventosCreados from '../pages/EventosCreados.jsx'
import '../css/styles.css';

function Navbar() {
  return (
    <nav>
      <Link to="/"> Home</Link>
      <Link to="/AutenticacionUser">Autenticarme</Link>
      <Link to="/BuscarEventos">Buscar Eventos</Link>
      <Link to="/CrearEventoForm">Crear Evento</Link>
      <Link to="/EventosCreados">Mis Eventos</Link>
    </nav>
  );
}
export default Navbar;