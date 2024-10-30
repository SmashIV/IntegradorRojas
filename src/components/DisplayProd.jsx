/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import "../assets/css/displayProd.css";
import Producto from "./Producto";
import axios from 'axios';
function DisplayProd() {
    const [productos, setProductos] = useState([]);
    const carruselRef = useRef(null);

    useEffect(() => {
        axios.get("https://backend-rojasweb.up.railway.app/random-productos")
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.error("Error al obtener productos:", error);
            });
    }, []);

    const desplazarCarrusel = (direccion) => {
        const carrusel = carruselRef.current;
        const desplazamiento = direccion === 'prev' ? -carrusel.offsetWidth : carrusel.offsetWidth;
        carrusel.scrollBy({ left: desplazamiento, behavior: 'smooth' });
        setTimeout(() => {
            if (direccion === 'sig' && carrusel.scrollLeft + carrusel.offsetWidth >= carrusel.scrollWidth) {
                carrusel.scrollLeft = 0;
            } else if (direccion === 'prev' && carrusel.scrollLeft === 0) {
                carrusel.scrollLeft = carrusel.scrollWidth;
            }
        }, 500); 
    };

    return (
        <div className="dis-prod" id="dis-prod">
            <h2>Productos Recomendados</h2>
            <div className="contenedor-carrusel">
                <button className="prev" onClick={() => desplazarCarrusel('prev')}>&#10094;</button>
                <div className="carrusel" ref={carruselRef}>
                    {productos.concat(productos).map((prod, index) => (
                        <div className="producto-carrusel" key={index}>
                            <Producto id={prod.IDPRODUCTO} nombre={prod.NOMBRE} precio={prod.PRECIOUNITARIO} descripcion={prod.DESCRIPCION} imagen={prod.IMAGEN} />
                        </div>
                    ))}
                </div>
                <button className="sig" onClick={() => desplazarCarrusel('sig')}>&#10095;</button>
            </div>
        </div>
    );
}

export default DisplayProd;