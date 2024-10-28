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
import Categoria from "./pages/Categoria"
import ProductoDetalle from "./components/ProductoDetalle"
import Pedidos from "./pages/Pedidos"
import PedidoDetalle from "./components/PedidoDetalle"

const App = () => {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <>
      {mostrarLogin ? <Login setMostrarLogin={setMostrarLogin} /> : <></>}
      <div className="main-container">
        <div className="app">
          <Navbar setMostrarLogin={setMostrarLogin} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/orden" element={<PagOrden />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/usuario" element={<UsuarioView />} />
              <Route path="/categoria" element={<Categoria />} />
              <Route path="/producto/:id" element={<ProductoDetalle />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/pedido/:id" element={<PedidoDetalle />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;