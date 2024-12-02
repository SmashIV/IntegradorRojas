/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "../assets/css/login.css";
import { img } from "../assets/imgs";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ctx/AuthCtx";

function Login({ setMostrarLogin }) {
    const [estadoActual, setEstadoActual] = useState("Iniciar Sesión");
    const [nombreUsuario, setNombreUsuario] = useState("");    
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [errores, setErrores] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [codigoConfirmado, setCodigoConfirmado] = useState("");
    const [codigoEnviado, setCodigoEnviado] = useState(false);
    const [contador, setContador] = useState(59);
    const [mostrarReenviar, setMostrarReenviar] = useState(false);

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

    useEffect(() => {
        let timer;
        if (estadoActual === "Confirmar Correo" && contador > 0) {
            timer = setInterval(() => {
                setContador((prev) => prev - 1);
            }, 1000);
        } else if (contador === 0) {
            setMostrarReenviar(true);
        }
        return () => clearInterval(timer);
    }, [estadoActual, contador]);

    const handleReenviarCodigo = async () => {
        try {
            await axios.post("https://backend-rojasweb.up.railway.app/reenviar-codigo", {
                correoElectronico
            });
            setContador(59);
            setMostrarReenviar(false);
        } catch (error) {
            setErrores("Error al reenviar el código. Inténtelo nuevamente.");
        }
    };

    const handleIngreso = async (e) => {
        e.preventDefault();
        setErrores("");

        if (estadoActual === "Registrarse") {
            if (password !== confirmarPassword) {
                setErrores("Las contraseñas no coinciden. :/");
                return;
            }

            if (password.length < 8) {
                setErrores("La contraseña debe tener al menos 8 caracteres. :/");
                return;
            }

            const regexEspecial = /[!@#$^&*(),.?":{}|<>]/;
            const regexMayuscula = /[A-Z]/;
            const regexNumero = /[0-9]/;

            if (!regexEspecial.test(password) || !regexMayuscula.test(password) || !regexNumero.test(password)) {
                setErrores("La contraseña debe tener al menos un caracter especial, un número, una letra mayúscula");
                return;
            }

            try {
                const respuesta = await axios.post("https://backend-rojasweb.up.railway.app/enviar-codigo", {
                    nombreUsuario,
                    correoElectronico,
                    password
                });

                if (respuesta.status === 200) {
                    setCodigoEnviado(true);
                    setEstadoActual("Confirmar Correo");
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
        } else if (estadoActual === "Confirmar Correo") {
            try {
                const respuesta = await axios.post("https://backend-rojasweb.up.railway.app/confirmar-correo", {
                    correoElectronico,
                    codigoConfirmado
                });
                if (respuesta.status === 201) {
                    setEstadoActual("Iniciar Sesión");
                    setErrores("");
                }
            } catch (error) {
                setErrores("Error al confirmar el correo. Verificar el código :/");
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
                    {estadoActual === "Confirmar Correo" && (
                        <>
                            <p>Revise su correo electrónico y verifique el código de confirmación.</p>
                            <p> <strong>Tiempo restante: </strong> {contador} segundos.</p>
                            <input type="text" placeholder="Ingrese el código de confirmación" value={codigoConfirmado} onChange={(e) => setCodigoConfirmado(e.target.value)} required />
                            {mostrarReenviar && (
                                <button type="button" onClick={handleReenviarCodigo}>Reenviar Código</button>
                            )}
                        </>
                    )}
                </div>
                <button>{estadoActual === "Registrarse" ? "Crea una cuenta" : estadoActual === "Iniciar Sesión" ? "Iniciar Sesión" : "Confirmar Correo"}</button>
                {estadoActual === "Registrarse" && (
                    <div className="login-condicion">
                        <input type="checkbox" required />
                        <p>Acepto los términos y condiciones.</p>
                    </div>
                )}
            
                { estadoActual === "Iniciar Sesión" ? (
                    <p>¿No tiene una cuenta?<span onClick={() => { setEstadoActual("Registrarse"); setErrores(""); }}> Clickear Aquí</span></p>
                ) : estadoActual === "Registrarse" ? (
                    <p>¿Tiene una cuenta? <span onClick={() => { setEstadoActual("Iniciar Sesión"); setErrores(""); }}> Iniciar Sesión Aquí</span></p>
                ) : null }
            </form>
        </div>
    );
}

export default Login;