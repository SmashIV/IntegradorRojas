
import { useContext, useState } from "react"
import "../assets/css/carrito.css"
import { ProdStoreCtx } from "../ctx/ProdStoreCtx"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ctx/AuthCtx";
import axios from "axios";
function Carrito() {

    const { prodCarrito, eliminarCarrito, lista_productos, obtenerTotal, aplicarDescuento, descuento } = useContext(ProdStoreCtx);
    const { usuario } = useContext(AuthContext);
    const [mensajeError, setMensajeError] = useState("");
    const [codigoPromocion, setCodigoPromocion] = useState("");
    const [mensajePromocion, setMensajePromocion] = useState("");
    const [nombreProductoPromocion, setNombreProductoPromocion] = useState("");
    const nav = useNavigate();

    const handleProcederCompra = () => {
        if (!usuario) {
            setMensajeError("Debes iniciar sesión o registrarte para proceder a la compra.");
            return;
        }

        if (obtenerTotal() === 0) {
            setMensajeError("El carrito está vacío. Agregue productos para proceder a la compra.");
            return;
        }
        nav('/orden');
    };

    const handleAplicarPromocion = async () => {
        setMensajePromocion("");
        try {
            const respuesta = await axios.post("https://backend-rojasweb.up.railway.app/aplicar-promocion", {
                codigoPromocion
            });
            if (respuesta.status === 200) {
                const { id_producto, nuevo_precio, nombre_producto } = respuesta.data;
                if (prodCarrito[id_producto]) {
                    aplicarDescuento(id_producto, nuevo_precio);
                } else {
                    setNombreProductoPromocion(nombre_producto);
                    setMensajePromocion(`El producto ${nombre_producto} no está en el carrito. Por favor, asegúrese de agregarlo.`);
                }
            }
        } catch (error) {
            setMensajePromocion("Código de promoción no válido");
        }
    }

    console.log(prodCarrito);
    return (
        <div className="carrito">
            <div className="carrito-prod">
                <div className="carrito-titulo">
                    <p>Productos</p>
                    <p>Titulo</p>
                    <p>Precio</p>
                    <p>Cantidad</p>
                    <p>Total</p>
                    <p>Eliminar</p>
                </div>
                <br />
                <hr />
                {lista_productos.map((item) => {
                    if (prodCarrito[item.IDPRODUCTO] > 0) {
                        const precioOriginal = item.PRECIOUNITARIO;
                        const precioConDescuento = descuento[item.IDPRODUCTO] || precioOriginal;
                        return (
                            <div key={item.IDPRODUCTO}>
                                <div className="carrito-titulo carrito-item">
                                    <img src={item.IMAGEN} alt="" />
                                    <p>{item.NOMBRE}</p>
                                    <p>
                                        {descuento[item.IDPRODUCTO] ? (
                                            <>
                                                <span className="precio-original">S./{precioOriginal}</span>
                                                <span className="precio-descuento">S./{precioConDescuento}</span>
                                            </>
                                        ) : (
                                            <span>S./{precioOriginal}</span>
                                        )}
                                    </p>
                                    <p>{prodCarrito[item.IDPRODUCTO]}</p>
                                    <p>S./{precioConDescuento * prodCarrito[item.IDPRODUCTO]}</p>
                                    <p className="remover" onClick={() => {
                                        eliminarCarrito(item.IDPRODUCTO);
                                    }}>X</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                })}
            </div>
            <div className="carrito-especs">
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
                            <p>S./{obtenerTotal() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="carrito-detalles">
                            <b>Total</b>
                            <b>S./{obtenerTotal() === 0 ? 0 : obtenerTotal() + 2}</b>
                        </div>
                    </div>
                    {mensajeError && (<p className="mensaje-error">{mensajeError}</p>)}
                    <button onClick={handleProcederCompra}>Proceder a Comprar</button>
                </div>
                <div className="carrito-promo">
                    <div>
                        <p>Si tienes un código de descuento, ingresa acá!</p>
                        <div className="carrito-input">
                            <input
                                type="text"
                                placeholder="Código de Promoción"
                                value={codigoPromocion}
                                onChange={(e) => setCodigoPromocion(e.target.value)}
                            />
                            <button onClick={handleAplicarPromocion}>Ingresar</button>
                        </div>
                        {mensajePromocion && (<p className="mensaje-promocion">{mensajePromocion}</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carrito