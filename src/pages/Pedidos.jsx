import { useContext, useEffect, useState } from "react"
import "../assets/css/pedidos.css"
import { AuthContext } from "../ctx/AuthCtx"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export default function Pedidos() {

    const { usuario } = useContext(AuthContext);
    const [pedidos, setPedidos] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const nav = useNavigate();


    useEffect(() => {

        if (usuario) {
            obtenerPedidos(usuario.IDUSUARIO);
        } else {
            setMensaje("Debe iniciar sesión para ver sus pedidos");
        }

    }, [usuario]);

    const obtenerPedidos = async (idUsuario) => {
        try {
            const respuestaCliente = await axios.get(`https://backend-rojasweb.up.railway.app/cliente/${idUsuario}`);

            if (respuestaCliente.status === 200) {
                const idCliente = respuestaCliente.data.IDCLIENTE;
                const respuestaPedidos = await axios.get(`https://backend-rojasweb.up.railway.app/pedidos/${idCliente}`);

                if (respuestaPedidos.status === 200 && respuestaPedidos.data.length > 0) {
                    setPedidos(respuestaPedidos.data);
                }
            } else {
                setMensaje("No se han realizado pedidos");
            }

        } catch (error) {
            setMensaje("No se han realizado pedidos");
        }
    }

    const handleFilaClick = (idPedido) => {
        nav(`/pedido/${idPedido}`);
    };

return (
        <div className="ordenes-container">
            <h2>Tus órdenes</h2>
            {pedidos.length > 0 ? (
                <table className="ordenes-tabla">
                    <thead>
                        <tr>
                            <th>ID PEDIDO</th>
                            <th>COSTO TOTAL</th>
                            <th>FECHA DEL PEDIDO</th>
                            <th>ESTADO DEL PEDIDO</th>
                            <th>DETALLES DEL PEDIDO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.IDPEDIDO}>
                                <td>{pedido.IDPEDIDO}</td>
                                <td>S/.{pedido.PEDIDOTOTAL}</td>
                                <td>{pedido.FECHAPEDIDO}</td>
                                <td>{pedido.ESTADOPEDIDO}</td>
                                <td><a onClick={() => handleFilaClick(pedido.IDPEDIDO)} className="detalle-link">Detalles</a></td>
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
