/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import '../assets/css/navbar.css'
import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router-dom';
import { ProdStoreCtx } from '../ctx/ProdStoreCtx';
function Navbar({setMostrarLogin}) {

    const [menu, setMenu] = useState("home");

    const { obtenerTotal } = useContext(ProdStoreCtx);

    return (
        <div className='navbar'>
            <a href="#" className='logo'>
                <Link to='/'><img src="/src/assets/img/logo.jpeg" alt="logo"/><span className='logo-titulo'>Rojas Market</span></Link>
            </a>
            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Pagina Principal</Link>
                <a onClick={() => setMenu("categorias")} className={menu === "categorias" ? "active" : ""}>Categorias</a>
                <a onClick={() => setMenu("contacto")} className={menu === "contacto" ? "active" : ""}>Contacto</a>
                <a onClick={() => setMenu("carrito")} className={menu === "carrito" ? "active" : ""}>Mis Pedidos</a>
                <a onClick={() => setMenu("usuario")} className={menu === "usuario" ? "active" : ""}>Usuario</a>
            </ul>
            <div className="navbar-derecha">
                <i className="ri-search-line"></i>
                <div className="navbar-busqueda">
                    <Link to='/carrito'><i className="ri-shopping-basket-line"></i></Link>
                    <div className={obtenerTotal()=== 0 ? "" : "punto"}></div>
                </div>
                <button onClick={() => setMostrarLogin(true)}>Iniciar Sesión</button>
            </div>
        </div>
    )
}

export default Navbar