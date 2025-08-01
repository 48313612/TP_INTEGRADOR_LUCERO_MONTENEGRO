import { HashRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AutenticacionUser from './pages/AutenticacionUser'
import BuscarEventos from './pages/BuscarEventos.jsx'
// import DetalleEvento from './pages/DetalleEvento.jsx'
// import EventosCreados from './pages/EventosCreados.jsx'
// import CrearEventoForm from './pages/CrearEventoForm.jsx'
// import Ubicaciones from './pages/Ubicaciones.jsx'

export default function App() {
  return (  
    <>
    <HashRouter>
    <Navbar />
    <Routes> 
        <Route path="/">
          <Route index element={<Home />}></Route>
          <Route path="/AutenticacionUser" element={<AutenticacionUser />}> </Route>
          <Route path="/BuscarEventos" element={<BuscarEventos />}></Route>
          {/* <Route path="/DetalleEvento" element={<DetalleEvento />}></Route>
          <Route path="/EventosCreados" element={<EventosCreados />}></Route>
          <Route path="/CrearEventoForm" element={<CrearEventoForm />}></Route>
          <Route path="/Ubicaciones" element={<Ubicaciones />}></Route> */}
        </Route>
   </Routes>
   </HashRouter>
   </>
  )
}