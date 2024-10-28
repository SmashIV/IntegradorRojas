import { useContext, useEffect, useState } from "react";
import "../assets/css/orden.css";
import { ProdStoreCtx } from "../ctx/ProdStoreCtx";
import { useNavigate} from "react-router-dom";
import { AuthContext } from "../ctx/AuthCtx";
import axios from "axios";

function PagOrden() {
    const { prodCarrito , obtenerTotal, vaciarCarrito } = useContext(ProdStoreCtx);
    const { usuario } = useContext(AuthContext)
    const navigate = useNavigate();

    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [direccion, setDireccion] = useState("");
    const [distrito, setDistrito] = useState("Ica");
    const [numeroCelular, setNumeroCelular] = useState("");
    const [clienteExistente, setClienteExistente] = useState(false);
    const [idCliente, setIdCliente] = useState(null);
    const [mensajeError, setMensajeError] = useState("");

    const tasaCambio = 3.76;

    useEffect(() => {
        if (!usuario) {
            if (!usuario || Object.keys(prodCarrito).length === 0) {
                navigate('/');
                return;
            }
        }

        setCorreoElectronico(usuario.CORREOELECTRONICO);
        obtenerDatosCliente(usuario.IDUSUARIO);

    }, [usuario, prodCarrito, navigate]);

    const obtenerDatosCliente = async (idUsuario) => {
        try {
            const respuesta = await axios.get(`https://backend-rojasweb.up.railway.app/cliente/${idUsuario}`);
            if (respuesta.status === 200) {
                const cliente = respuesta.data;
                setNombres(cliente.NOMBRES);
                setApellidos(cliente.APELLIDOS);
                setDireccion(cliente.DIRECCION);
                setNumeroCelular(cliente.NUMEROCELULAR);
                setIdCliente(cliente.IDCLIENTE);
                setClienteExistente(true);
            } 
        } catch (error) {
            console.error("Error al obtener los datos del cliente ", error);
        }
    };

    const validarCampos = () => {
        if (!nombres || !apellidos || !direccion || !numeroCelular) {
            setMensajeError("Todos los campos son obligatorios");
            return false;
        }
        setMensajeError("");
        return true;
    }

    const crearCliente = async () => {
        if (!validarCampos()) return;

        try {
            const nuevoCliente = {
                nombres,
                apellidos,
                direccion,
                numeroCelular,
                id_usuario: usuario.IDUSUARIO
            };

            const respuesta = await axios.post("https://backend-rojasweb.up.railway.app/crear-cliente", nuevoCliente);

            if (respuesta.status === 200) {
                setIdCliente(respuesta.data.idCliente);
                setClienteExistente(true);
            } else {
                setMensajeError("Error con los campos!");
                return;
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const formatoFecha = (fecha) => {
        const date = new Date(fecha);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    const crearPedido = async (detallesTransaccion) => {
        try {
            const pedido = {
                distrito,
                estadoPedido: "Pagado",
                fechaPedido: formatoFecha(new Date()),
                pedidoTotal: obtenerTotal() + 2,
                subtotal: obtenerTotal(),
                id_cliente: idCliente,
                id_pago: 3
            };

            const respuestaPedido = await axios.post("https://backend-rojasweb.up.railway.app/crear-pedido", pedido);
            const idPedido = respuestaPedido.data.idPedido;

            const detallePedidos = Object.keys(prodCarrito).map(idProducto => ({
                cantidad: prodCarrito[idProducto],
                fechaPago: formatoFecha(new Date()),
                identificadorTransaccion: detallesTransaccion.id,
                id_pedido: idPedido,
                id_producto: idProducto
            }));

            await axios.post("https://backend-rojasweb.up.railway.app/crear-detalle-pedido", detallePedidos);


            vaciarCarrito();
            navigate('/')

        } catch (error) {
            console.error("Error ", error)
        }
    };

    const convertirAPrecioUSD = (precioPEN) => {
        return (precioPEN / tasaCambio).toFixed(2);
    };

    useEffect(() => {
        if (clienteExistente) {
            const paypalButtonContainer = document.getElementById('paypal-button-container');
            paypalButtonContainer.innerHTML = '';

            if (window.paypal) {
                window.paypal.Buttons({
                    createOrder: (data, actions) => {
                        const totalPEN = obtenerTotal() + 2;
                        const totalUSD = convertirAPrecioUSD(totalPEN);
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: totalUSD
                                }
                            }]
                        });
                    },
                    onApprove: (data, actions) => {
                        return actions.order.capture().then(details => {
                            crearPedido(details);
                        });
                    },
                    onError: (err) => {
                        console.error("Error en el pago de PayPal:", err);
                    }
                }).render('#paypal-button-container');
            }
        }
    }, [clienteExistente, obtenerTotal, navigate]);

    console.log(idCliente);

    return (
        <div>

            <form className="form-orden">
                <div className="orden-izq">
                    <p className="orden-titulo">Información de Envío</p>
                    {clienteExistente && (
                        <div className="aviso">
                            <p>Si desea cambiar algunos datos, diríjase al panel de usuario</p>
                        </div>
                    )}
                    <div className="orden-inputs">
                        <input type="text" placeholder="Nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} readOnly={clienteExistente} required/>
                        <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} readOnly={clienteExistente} required />
                    </div>
                    <input type="text" placeholder="Correo Electrónico" value={correoElectronico} readOnly/>
                    <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} readOnly={clienteExistente} required/>
                    <div className="orden-inputs">
                        <select name="distrito" value={distrito} onChange={(e) => setDistrito(e.target.value)}>
                            <option value="Ica">Ica</option>
                            <option value="Los Aquijes">Los Aquijes</option>
                            <option value="Fernandini">Fernandini</option>
                        </select>
                        <input type="text" placeholder="Número de celular" value={numeroCelular} onChange={(e) => setNumeroCelular(e.target.value)} readOnly={clienteExistente} required/>
                    </div>
                </div>
                <div className="orden-der">
                    <div className="carrito-total">
                        <h2>Total del Pedido</h2>
                        <div>
                            <div className="carrito-detalles">
                                <p>Subtotal</p>
                                <p>S./{obtenerTotal()}</p>
                            </div>
                            <hr />
                            <div className="carrito-detalles">
                                <p>Total de Envío</p>
                                <p>S./{2}</p>
                            </div>
                            <hr />
                            <div className="carrito-detalles">
                                <b>Total</b>
                                <b>S./{(obtenerTotal() + 2).toFixed(2)}</b>
                            </div>
                        </div>
                        {!clienteExistente && (
                            <button type="button" onClick={crearCliente}>Proceder al pago</button>
                        )}
                        {mensajeError && <p className="mensaje-error">{ mensajeError}</p>}
                        <div id="paypal-button-container"></div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PagOrden;