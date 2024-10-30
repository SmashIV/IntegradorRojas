import "../assets/css/categoria.css"
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
function Categoria() {

    const [lista_productos, setListaProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Ninguna");
    const [ordenPrecio, setOrdenPrecio] = useState("");
    const [ordenNombre, setOrdenNombre] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://backend-rojasweb.up.railway.app/display-productos")
        //axios.get("http://localhost:8081/display-productos")
            .then(response => {
                setListaProductos(response.data);
                const categoriasUnicas = [...new Set(response.data.map(producto => producto.CATEGORIA_NOMBRE))];
                setCategorias(categoriasUnicas);

            })
            .catch(error => {
                console.error("error :/", error);
            })
    }, [])

    const handleProductoClick = (id) => {
        navigate(`/producto/${id}`);
    }

    const handleCategoriaChange = (e) => {
        setCategoriaSeleccionada(e.target.value);
    }

    const handlePrecioChange = (e) => {
        setOrdenPrecio(e.target.value);
        setOrdenNombre("Seleccionar");
    }

    const handleNombreChange = (e) => {
        setOrdenNombre(e.target.value);
        setOrdenPrecio("Seleccionar");
    }

    const filtrarProductos = () => {
        let productosFiltrados = [...lista_productos];

        if (categoriaSeleccionada !== "Ninguna") {
            productosFiltrados = productosFiltrados.filter(producto => producto.CATEGORIA_NOMBRE === categoriaSeleccionada);
        }

        if (ordenPrecio === "Menor") {
            productosFiltrados.sort((a, b) => a.PRECIOUNITARIO - b.PRECIOUNITARIO);
        } else if (ordenPrecio === "Mayor") {
            productosFiltrados.sort((a, b) => b.PRECIOUNITARIO - a.PRECIOUNITARIO);
        }

        if (ordenNombre === "A-Z") {
            productosFiltrados.sort((a, b) => a.NOMBRE.localeCompare(b.NOMBRE));
        } else if (ordenNombre === "Z-A") {
            productosFiltrados.sort((a, b) => b.NOMBRE.localeCompare(a.NOMBRE));
        }

        return productosFiltrados;
    };


    return (
        <div className="dashboard-prod">
            <div className="filtro-contenedor">
                <div className="filtro-info">
                    <h2>{filtrarProductos().length} resultados</h2>
                </div>
                <div className="filtros">
                    <span className="filtro-label">Categorias</span>
                    <select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
                        <option value="Ninguna">Ninguna</option>
                        {categorias.map((categoria, index) => (
                            <option key={index} value={categoria}>{categoria}</option>
                        ))}
                    </select>
                    <span className="filtro-label">Ordenar por Precio</span>
                    <select value={ordenPrecio} onChange={handlePrecioChange}>
                        <option value="">Seleccionar</option>
                        <option value="Menor">Precio: Menor a Mayor</option>
                        <option value="Mayor">Precio: Mayor a Menor</option>
                    </select>
                    <span className="filtro-label">Ordenar por Nombre</span>
                    <select value={ordenNombre} onChange={handleNombreChange}>
                        <option value="">Seleccionar</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>
            </div>
            <div className="producto-grid">
                {filtrarProductos().map((producto) => (
                    <div key={producto.IDPRODUCTO} className="producto-unidad">
                        <img src={producto.IMAGEN} alt={producto.NOMBRE} />
                        <div className="prod-detalles">
                            <h3>{producto.NOMBRE}</h3>
                            <p>{producto.DESCRIPCION}</p>
                            <div className="prod-comprar">
                                <span className="precio">S/.{producto.PRECIOUNITARIO.toFixed(2)}</span>
                                <button className="boton-comprar" onClick={() => handleProductoClick(producto.IDPRODUCTO)}>Comprar</button>
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