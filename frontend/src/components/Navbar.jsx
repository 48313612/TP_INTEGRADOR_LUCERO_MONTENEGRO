import React from 'react';
import { Link } from "react-router-dom";
import AutenticacionUser from '../pages/AutenticacionUser'

function Navbar() {
  return (
    <nav>
      <Link to="/"> Home</Link>
      <Link to="/AutenticacionUser">Iniciar Sesión</Link>
    </nav>
  );
}
export default Navbar;