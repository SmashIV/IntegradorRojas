import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import "./index.css"
import Home from "./pages/Home"
import Carrito from "./pages/Carrito"
import Footer from "./components/Footer"
import { useState } from "react"
import Login from "./components/Login"
import PagOrden from "./pages/PagOrden"
import Contacto from "./pages/Contacto"
import UsuarioView from "./pages/UsuarioView"

const App = () => {

  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <>
      {mostrarLogin ? <Login setMostrarLogin={setMostrarLogin } /> : <></> }
      <div className="app">
        <Navbar setMostrarLogin={ setMostrarLogin } />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/orden" element={<PagOrden />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/usuario" element={<UsuarioView/> } />
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App