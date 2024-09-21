 /* eslint-disable react/prop-types */
import { useContext} from 'react'
import "../assets/css/producto.css"
import { img } from '../assets/imgs';
import { ProdStoreCtx } from '../ctx/ProdStoreCtx';
function Producto({ id, nombre, precio, descripcion, imagen }) {
    
    const { prodCarrito, agregarCarrito, eliminarCarrito } = useContext(ProdStoreCtx);

    return (
        <div className='producto'>
            <div className="contenedor-img">
                <img className='prod-img' src={imagen} alt="" />
                {
                    !prodCarrito[id] ? <img className='agregar' onClick={ () => agregarCarrito(id)} src={img.boton_blanco} alt="" /> : 
                        <div className='prod-contador'>
                            <img onClick={() => eliminarCarrito(id)} src={img.boton_rojo} alt="" />
                            <p>{prodCarrito[id]}</p>
                            <img onClick={() => agregarCarrito(id)} src={img.boton_verde} alt="" />
                        </div>
                }
            </div>
            <div className="prod-info">
                <div className="prod-nombre">
                    <p>{nombre}</p>
                </div>
                <p className="prod-item-desc">{descripcion}</p>
                <p className="prod-item-precio">S./{precio}</p>
            </div>
        </div>
    )
}

export default Producto