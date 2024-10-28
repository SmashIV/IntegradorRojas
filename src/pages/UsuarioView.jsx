import { useContext, useEffect, useState } from 'react'
import '../assets/css/usuarioview.css'
import { AuthContext } from '../ctx/AuthCtx';
import axios from 'axios';
function UsuarioView() {

    const { usuario, iniciarSesion } = useContext(AuthContext);
    const [nombres, setNombres]  = useState("");
    const [apellidos, setApellidos] = useState("");
    const [direccion, setDireccion] = useState("");
    const [numeroCelular, setNumeroCelular] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [password, setPassword ] = useState("");
    const [editPassword, setEditPassword ] = useState(false);
    const [errores, setErrores] = useState([]);
    const [clienteExistente, setClienteExistente] = useState(false);




    useEffect(() => {
        if (usuario) {
            setCorreoElectronico(usuario.CORREOELECTRONICO);
            setPassword(usuario.PASSWORD);
            obtenerDatoscliente(usuario.IDUSUARIO)
        }

    }, [usuario]);

    const obtenerDatoscliente = async (idUsuario) => {
        try {
            const respuesta = await axios.get(`https://backend-rojasweb.up.railway.app/cliente/${idUsuario}`);
            if (respuesta.status === 200) {
                const cliente = respuesta.data;
                setNombres(cliente.NOMBRES);
                setApellidos(cliente.APELLIDOS);
                setDireccion(cliente.DIRECCION);
                setNumeroCelular(cliente.NUMEROCELULAR);
                setClienteExistente(true);
            }
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    }

    const handleActualizar = async (e) => {
        e.preventDefault();
        let erroresTemp = [];

        if (!nombres || !apellidos || !direccion || !numeroCelular) {
            erroresTemp.push("Todos los campos son obligatorios");
        }
        if (erroresTemp.length > 0) {
            setErrores(erroresTemp);
            return;
        }

        try {

            if (clienteExistente) {
                const respuestaCliente = await axios.put(`https://backend-rojasweb.up.railway.app/actualizar-cliente/${usuario.IDUSUARIO}`, {
                    nombres, 
                    apellidos,
                    direccion,
                    numeroCelular
                })
            } else {
                    const respuestaCliente = await axios.post("https://backend-rojasweb.up.railway.app/crear-cliente", {
                    nombres,
                    apellidos,
                    direccion,
                    numeroCelular,
                    id_usuario: usuario.IDUSUARIO
                });
            }
            if (editPassword && password !== usuario.PASSWORD || correoElectronico != usuario.CORREOELECTRONICO) {
                const respuestaUsuario = await axios.put(`https://backend-rojasweb.up.railway.app/actualizar-usuario/${usuario.IDUSUARIO}`, {
                    password,
                    correoElectronico
                });
                iniciarSesion({ ...usuario, PASSWORD: password, CORREOELECTRONICO: correoElectronico });
            }
        } catch (error) {
            erroresTemp.push("Error al crear el cliente");
            setErrores(erroresTemp);
        }

    }

    return (
        <div className="contenedor-usuario">
            <div className="sidebar">
                <ul>
                    <li>
                        Detalles de la cuenta
                    </li>
                    <li>
                        Pedidos Realizados
                    </li>
                    <li>
                        Preferencias
                    </li>
                </ul>
            </div>
            <div className="formulario-usuario">
                <h2>Detalle de la cuenta</h2>
                <form className='usuario-form' onSubmit={handleActualizar}>
                    {errores.length > 0 && (
                            <div className='errores'>
                                {errores.map((error, index) => (
                                    <p key={index} className='error'>{error}</p>
                                ))}
                            </div>
                        )}
                    <label className='usuario-label'>
                        <span>Nombres</span>
                        <input className='usuario-input' type="text" placeholder="Ingrese sus nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} required/>
                    </label>
                    <label className='usuario-label'>
                        <span>Apellidos</span>
                        <input className='usuario-input' type="text" placeholder="Ingrese sus Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required/>
                    </label>
                    <label className='usuario-label'>
                        <span>Dirección</span>
                        <input className='usuario-input' type="text" placeholder="Ingrese su dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                    </label>
                    
                    <label className='usuario-label'>
                        <span>Contraseña</span>
                        <input className='usuario-input' type={editPassword ? "text" : "password"} placeholder='Ingrese su contraseña' value={password} onChange={(e) => setPassword(e.target.value)} disabled={!editPassword} required/>
                        <a className='edit-formulario' href="*" onClick={(e) => { e.preventDefault(); setEditPassword(!editPassword); }}>{ editPassword ? "Dejar de ver" : "Editar"}</a>
                    </label>
                    <label className='usuario-label'>
                        <span>Correo Electronico</span>
                        <input className='usuario-input' type="email" placeholder="Ingrese su correo electrónico" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} required/>
                    </label>
                    <label className='usuario-label'>
                        <span>Numero de celular</span>
                        <input className='usuario-input' type="text" placeholder="Agregar Numero" value={numeroCelular} onChange={(e) => setNumeroCelular(e.target.value)}  required/>
                    </label>
                    <button className='btn-actualizar'>Actualizar</button>
                </form>
            </div>
        </div>
    )
}

export default UsuarioView