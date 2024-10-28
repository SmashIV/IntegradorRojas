import { useContext, useEffect, useState } from 'react'
import '../assets/css/productodetalles.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ProdStoreCtx } from '../ctx/ProdStoreCtx';

function ProductoDetalle() {
    const { agregarCarrito } = useContext(ProdStoreCtx);
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`https://backend-rojasweb.up.railway.app/producto/${id}`)
        //axios.get(`http://localhost:8081/producto/${id}`)
            .then(res => {
                setProducto(res.data);
            })
            .catch(err => {
                console.log("error :/", err);
            });

    } , [id])

    const handleAgregarACarrito = () => {
        agregarCarrito(id, parseInt(cantidad));
        navigate('/carrito')
    };


    if (!producto) {
        return <div>No se encontró producto...</div>
    }

    return (
        <div className='productos-detalle'>
            <h2>Detalle Productos :D</h2>
            <img src={producto.IMAGEN} alt={ producto.NOMBRE} />
            <h1>{producto.NOMBRE}</h1>
            <p>{producto.DESCRIPCION}</p>
            <span className='precio'>S/.{producto.PRECIOUNITARIO.toFixed(2)}</span>
            <div className='cantidad'>
                <label>Cantidad</label>
                <input type="number" min="1" value={cantidad} onChange={(e) =>  setCantidad(e.target.value) } />
            </div>
            <button className='boton-detalles' onClick={handleAgregarACarrito} >Agregar al carrito</button>
        </div>
    )
}

export default ProductoDetalle