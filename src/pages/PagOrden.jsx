import { useContext } from "react"
import "../assets/css/orden.css"
import { ProdStoreCtx } from "../ctx/ProdStoreCtx"
import { useNavigate } from "react-router-dom";

function PagOrden() {

    const { obtenerTotal } = useContext(ProdStoreCtx); 

    const nav = useNavigate;

    return (
        <div>
            <form className="form-orden">
                <div className="orden-izq">
                    <p className="orden-titulo">Información de Envío</p>
                    <div className="orden-inputs">
                        <input type="text" placeholder="Nombres"/>
                        <input type="text" placeholder="Apellidos" />
                    </div>
                    <input type="text" placeholder="Correo Electrónico"/>
                    <input type="text" placeholder="Dirección" />
                    <div className="orden-inputs">
                        <input type="text" placeholder="Segunda Dirección" />
                        <input type="text" placeholder="Código Postal"/>
                    </div>
                    <input type="text" placeholder="Número de Celular" />
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
                            <b>S./{ obtenerTotal() + 2 }</b>
                        </div>
                    </div>
                    <button onClick={() => {nav('/pagar')}}>Proceder a Pagar</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default PagOrden