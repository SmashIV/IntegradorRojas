/* eslint-disable react/prop-types */
import { useState } from "react"
import "../assets/css/login.css"
import { img } from "../assets/imgs";
function Login({setMostrarLogin }) {

    const [estadoActual, setEstadoActual] = useState("Registrarse");

    return (
        <div className="login">
            <form className="contenedor-login">
                <div className="titulo-login">
                    <h2>{estadoActual}</h2>
                    <img onClick={() => setMostrarLogin(false)} src={img.salir} alt="" />
                </div>
                <div className="login-input">
                    {estadoActual === "Iniciar Sesión" ? <></> :
                        <input type="text" placeholder="Ingrese su nombre de usuario" required /> }
                    <input type="email" placeholder="Ingrese su email" required />
                    <input type="password" placeholder="Ingrese su contraseña" required />
                </div>
                <button>{estadoActual === "Registrarse" ? "Crea una cuenta" : "Iniciar sesión"}</button>
                <div className="login-condicion">
                    <input type="checkbox" required />
                    <p>Acepto los terminos y condiciones.</p>
                </div>
                { estadoActual === "Iniciar Sesión" ?
                <p>¿No tiene una cuenta?<span onClick={() => setEstadoActual("Registrarse")}> Clickear Aquí</span></p> :
                <p>¿Tiene una cuenta? <span onClick={() => setEstadoActual("Iniciar Sesión")}> Iniciar Sesión Aquí</span></p> }
            </form>
        </div>
    )
}

export default Login