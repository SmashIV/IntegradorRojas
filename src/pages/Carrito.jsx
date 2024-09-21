
import { useContext } from "react"
import "../assets/css/carrito.css"
import { ProdStoreCtx } from "../ctx/ProdStoreCtx"
import { useNavigate } from "react-router-dom";

function Carrito() {

    const { prodCarrito, eliminarCarrito, lista_productos, obtenerTotal } = useContext(ProdStoreCtx);
    
    const nav = useNavigate();

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
                    if (prodCarrito[item._id] > 0) {
                        return (
                            <div key={item.id}>
                                <div className="carrito-titulo carrito-item">
                                    <img src={item.imagen} alt="" />
                                    <p>{item.nombre}</p>
                                    <p>S./{item.precio}</p>
                                    <p>{prodCarrito[item._id]}</p>
                                    <p>S./{item.precio * prodCarrito[item._id]}</p>
                                    <p className="remover" onClick={() => {
                                        eliminarCarrito(item._id);
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
                    <button onClick={() => {nav('/orden')}}>Proceder a Comprar</button>
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