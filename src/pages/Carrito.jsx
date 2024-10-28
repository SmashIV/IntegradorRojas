
import { useContext, useState } from "react"
import "../assets/css/carrito.css"
import { ProdStoreCtx } from "../ctx/ProdStoreCtx"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ctx/AuthCtx";

function Carrito() {

    const { prodCarrito, eliminarCarrito, lista_productos, obtenerTotal } = useContext(ProdStoreCtx);
    const { usuario } = useContext(AuthContext);
    const [mensajeError, setMensajeError] = useState("");
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
                        return (
                            <div key={item.IDPRODUCTO}>
                                <div className="carrito-titulo carrito-item">
                                    <img src={item.IMAGEN} alt="" />
                                    <p>{item.NOMBRE}</p>
                                    <p>S./{item.PRECIOUNITARIO}</p>
                                    <p>{prodCarrito[item.IDPRODUCTO]}</p>
                                    <p>S./{item.PRECIOUNITARIO * prodCarrito[item.IDPRODUCTO]}</p>
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
                            <b>S./{obtenerTotal()=== 0 ? 0 : obtenerTotal() + 2 }</b>
                        </div>
                    </div>
                    {mensajeError && (<p className="mensaje-error">{ mensajeError}</p> )   }
                    <button onClick={handleProcederCompra}>Proceder a Comprar</button>
                </div>
                <div className="carrito-promo">
                    <div>
                        <p>Si tienes un código de descuento, ingresa acá!</p>
                        <div className="carrito-input">
                            <input type="text" placeholder="Código de Promoción" />
                            <button>Ingresar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carrito