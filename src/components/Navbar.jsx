/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import '../assets/css/navbar.css'
import 'remixicon/fonts/remixicon.css'
import logo from "../assets/img/logorojas_nav.png";
import { Link, useLocation } from 'react-router-dom';
import { ProdStoreCtx } from '../ctx/ProdStoreCtx';
import { AuthContext } from '../ctx/AuthCtx';
function Navbar({setMostrarLogin}) {

    const [menu, setMenu] = useState("home");
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { obtenerTotal } = useContext(ProdStoreCtx);
    const { usuario, cerrarSesion } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setMenu("home");
        } else if (location.pathname.startsWith('/categoria') || location.pathname.startsWith('/producto')) {
            setMenu("categorias");
        } else if (location.pathname === '/contacto') {
            setMenu("contacto");
        } else if (location.pathname === '/pedidos' || location.pathname.startsWith('/pedido')){
            setMenu("pedidos");
        } else if (location.pathname === '/usuario'){
            setMenu("usuario");
        } else if (location.pathname === '/carrito' || location.pathname === '/orden' ) {
            setMenu("");
        }
    }, [location]);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto );
    }


    return (
        <div className='navbar'>
            <Link to='/' className='logo'><img src={logo} alt="logo"/></Link>
            <ul className={`navbar-menu ${menuAbierto ? 'abierto' : ''}`}>
                <Link to="/"  className={menu === "home" ? "active" : ""} onClick={toggleMenu}>Pagina Principal</Link>
                <Link to="/categoria" className={menu === "categorias" ? "active" : "" } onClick={toggleMenu}>Categorias</Link>
                <Link to="/contacto" className={menu === "contacto" ? "active" : ""} onClick={toggleMenu}>Contacto</Link>
                <Link to="/pedidos"  className={menu === "pedidos" ? "active" : ""} onClick={toggleMenu}>Mis Pedidos</Link>
                <Link to="/usuario" className={menu === "usuario" ? "active" : ""} onClick={toggleMenu}>Usuario</Link>
            </ul>
            <div className="navbar-derecha">
                <div className="navbar-busqueda">
                    <Link to='/carrito' onClick={() => setMenu("nada")}><i className="ri-shopping-basket-line"></i></Link>
                    <div className={obtenerTotal()=== 0 ? "" : "punto"}></div>
                </div>
                {
                    usuario ? (<button onClick={cerrarSesion}>Cerrar Sesión</button>)
                        : (<button onClick={() => setMostrarLogin(true)}>Iniciar Sesión</button>)
                }
            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                <i className='ri-menu-line'></i>
            </div>
        </div>
    )
}

export default Navbar