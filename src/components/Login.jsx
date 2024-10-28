/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import "../assets/css/login.css"
import { img } from "../assets/imgs";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ctx/AuthCtx";
function Login({setMostrarLogin }) {

    const [estadoActual, setEstadoActual] = useState("Iniciar Sesión");

    const [nombreUsuario, setNombreUsuario] = useState("");    
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [errores, setErrores] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);


    const navigate = useNavigate();
    const { iniciarSesion } = useContext(AuthContext);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setMostrarLogin(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setMostrarLogin]);


    const handleIngreso = async (e) => {
        e.preventDefault();
        setErrores("");

        if (estadoActual === "Registrarse") {
            if (password !=  confirmarPassword) {
                setErrores("Las contraseñas no coinciden. :/");
                return;
            }

            if (password.length < 8) {
                setErrores("La contraseña debe tener al menos 8 carácteres. :/");
                return;
            }

            const regexEspecial = /[!@#$^&*(),.?":{}|<>]/;
            const regexMayuscula = /[A-Z]/;
            const regexNumero = /[0-9]/;

            if (!regexEspecial.test(password) || !regexMayuscula.test(password) || !regexNumero.test(password)) {
                setErrores("La contraseña debe tener al menos un caracter especial, un numero, una letra mayúscula");
                return;
            }

            try {
                const respuesta = await axios.post("https://backend-rojasweb.up.railway.app/registro", {
                    nombreUsuario,
                    correoElectronico,
                    password,
                    id_rol: 1
                });

                if (respuesta.status == 201) {
                    setEstadoActual("Iniciar Sesión");
                }

            } catch (error) {
                setErrores("Error al registrar el usuario ");
            }

        } else if (estadoActual === "Iniciar Sesión") {
            try {
                const respuesta = await axios.post("https://backend-rojasweb.up.railway.app/login", {
                    correoElectronico,
                    password
                });
                if (respuesta.status === 200) {
                    iniciarSesion(respuesta.data.usuario);
                    navigate("/");
                    setMostrarLogin(false);
                    setErrores("");
                }
            } catch (error) {
                setErrores("Error al iniciar sesión. Verificar sus credenciales :/");
            }
        }

    };


    return (
        <div className="login">
            <form className="contenedor-login" onSubmit={handleIngreso}>
                <div className="titulo-login">
                    <h2>{estadoActual}</h2>
                    <img onClick={() => setMostrarLogin(false)} src={img.salir} alt="" />
                </div>
                { 
                    errores && (
                        <div className="errores">
                            <p className="error">{ errores}</p>
                        </div>
                    )
                }
                <div className="login-input">
                    {estadoActual === "Registrarse" && (
                        <>
                            <input type="text" placeholder="Ingrese su nombre de usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required />
                            <input type="email" placeholder="Ingrese su correo electrónico" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} required />
                            <input type="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <input type="password" placeholder="Confirme su contraseña" value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} required />
                        </>
                    )}

                    {estadoActual === "Iniciar Sesión" && (
                        <>
                            <input type="email" placeholder="Ingrese su correo electrónico" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} required />
                            <div className="password-input">
                                <input
                                    type={mostrarPassword ? "text" : "password"}
                                    placeholder="Ingrese su contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" onClick={() => setMostrarPassword(!mostrarPassword)}>
                                    {mostrarPassword ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                        </>  
                    )}
                </div>
                <button>{estadoActual === "Registrarse" ? "Crea una cuenta" : "Iniciar sesión"}</button>
                {estadoActual === "Registrarse" && (
                    <div className="login-condicion">
                    <input type="checkbox" required />
                    <p>Acepto los terminos y condiciones.</p>
                </div>
                )}
            
                { estadoActual === "Iniciar Sesión" ?
                    <p>¿No tiene una cuenta?<span onClick={() => { setEstadoActual("Registrarse"); setErrores(""); }}> Clickear Aquí</span></p> :
                    <p>¿Tiene una cuenta? <span onClick={() => { setEstadoActual("Iniciar Sesión"); setErrores(""); }}> Iniciar Sesión Aquí</span></p> }
            </form>
        </div>
    )
}

export default Login