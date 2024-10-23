import "../assets/css/categoria.css"
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
function Categoria() {

    const [lista_productos, setListaProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://backend-rojasweb.up.railway.app/display-productos")
        //axios.get("http://localhost:8081/display-productos")
            .then(response => {
                setListaProductos(response.data);
            })
            .catch(error => {
                console.error("error :/", error);
            })
    }, [])

    const handleProductoClick = (id) => {
        navigate(`/producto/${id}`);
    }

    return (
        <div className="dashboard-prod">
            <div className="filtro-contenedor">
                <div className="filtro-info">
                    <h2>{lista_productos.length} resultados</h2>
                </div>
                <div className="filtros">
                    <span className="filtro-label">Categorias</span>
                    <select>
                        <option value="Ninguna">Ninguna</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Carnes">Carnes</option>
                    </select>
                    <span className="filtro-label">Ordenar por Precio</span>
                    <select>
                        <option value="Lo más vendido">Lo más vendido</option>
                        <option value="Menor">Precio: Menor a Mayor</option>
                        <option value="Mayor">Precio: Mayor a Menor</option>
                    </select>
                    <span className="filtro-label">Ordenar por Nombre</span>
                    <select>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>
            </div>
            <div className="producto-grid">
                { 
                    lista_productos.map((producto) => (
                        <div key={producto.IDPRODUCTO} className="producto-unidad">
                            <img src={producto.IMAGEN} alt={producto.NOMBRE} />
                            <div className="prod-detalles">
                                <h3>{producto.NOMBRE}</h3>
                                <p>{producto.DESCRIPCION}</p>
                                <div className="prod-comprar">
                                    <span className="precio">S/.{producto.PRECIOUNITARIO.toFixed(2)}</span>
                                    <button className="boton-comprar" onClick={() => handleProductoClick(producto.IDPRODUCTO)} >Comprar</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="paginacion">
                <button className="paginacion-boton">&laquo;</button>
                <button className="paginacion-boton activo-boton">1</button>
                <button className="paginacion-boton">2</button>
                <button className="paginacion-boton">3</button>
                <button className="paginacion-boton">&raquo;</button>
            </div>
        </div>
    )
}

export default Categoria