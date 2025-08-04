import { HashRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AutenticacionUser from './pages/AutenticacionUser'
import BuscarEventos from './pages/BuscarEventos.jsx'
import DetalleEvento from './pages/DetalleEvento.jsx'
import MisEventos from './pages/MisEventos.jsx'
import CrearEventoForm from './pages/CrearEventoForm.jsx'
import Ubicaciones from './pages/Ubicaciones.jsx'

export default function App() {
  return (  
    <>
    <HashRouter>
    <Navbar />
    <Routes>           
        <Route path="/" element={<Home />} />
        <Route path="/AutenticacionUser" element={<AutenticacionUser />}> </Route>
        <Route path="/BuscarEventos" element={<BuscarEventos />}></Route>
        <Route path="/eventos/:id" element={<DetalleEvento />} />
        <Route path="/MisEventos" element={<MisEventos />}></Route>
        <Route path="/CrearEventoForm" element={<CrearEventoForm />}></Route>
        <Route path="/Ubicaciones" element={<Ubicaciones />}></Route>
   </Routes>
   </HashRouter>
   </>
  )
}