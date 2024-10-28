import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../assets/css/pedidos.css";
import axios from 'axios';
import { AuthContext } from '../ctx/AuthCtx';

function PedidoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);
    const [detalles, setDetalles] = useState([]);
    const [mensaje, setMensaje] = useState("Cargando detalles del pedido...");

    useEffect(() => {

        if (!usuario) {
            navigate('/');
            return;
        }

        obtenerDetallesPedidoYCliente(id);
    }, [id, usuario, navigate]);

    const obtenerDetallesPedidoYCliente = async (idPedido) => {
        try {

            const respuestaCliente = await axios.get(`https://backend-rojasweb.up.railway.app/cliente/${usuario.IDUSUARIO}`)
            if (respuestaCliente.status != 200 || !respuestaCliente.data) {
                navigate('/');
                return;
            }

            const idCliente = respuestaCliente.data.IDCLIENTE;

            const respuestaPedido = await axios.get(`https://backend-rojasweb.up.railway.app/pedido/${idPedido}`);
            if (respuestaPedido.status !== 200 || respuestaPedido.data.id_cliente != idCliente) {
                navigate('/');
                return;
            }


            const respuestaDetalles = await axios.get(`https://backend-rojasweb.up.railway.app/detalle-pedido/${idPedido}`);
            if (respuestaDetalles.status === 200 && respuestaDetalles.data.length > 0) {
                setDetalles(respuestaDetalles.data);
            } else {
                setMensaje("No se encontraron detalles para este pedido.");
            }
        } catch (error) {
            console.error("Error al obtener los detalles del pedido:", error);
            setMensaje("Error al cargar los detalles del pedido.");
        }
    };

    return (
        <div className='ordenes-container'>
            <h2>Detalles del Pedido</h2>
            {detalles.length > 0 ? (
                <table className='ordenes-tabla'>
                    <thead>
                        <tr>
                            <th>ID DEL PRODUCTO</th>
                            <th>PRODUCTO</th>
                            <th>NOMBRE DEL PRODUCTO</th>
                            <th>CANTIDAD</th>
                            <th>ID DE TRANSACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalles.map((detalle) => (
                            <tr key={detalle.id_producto}>
                                <td>{detalle.id_producto}</td>
                                <td><img className='producto-imagen' src={detalle.imagen} alt={detalle.nombre_producto} /></td>
                                <td>{detalle.nombre_producto}</td>
                                <td>{detalle.cantidad}</td>
                                <td>{ detalle.identificadorTransaccion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>{mensaje}</p>
            )}
        </div>
    );
}

export default PedidoDetalle;