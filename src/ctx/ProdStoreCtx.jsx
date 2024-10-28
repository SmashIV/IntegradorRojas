/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const ProdStoreCtx = createContext(null);

export const ProdStoreCtxProvider = (props) => {
    const [prodCarrito, setProdCarrito] = useState({});
    const [lista_productos, setListaProductos] = useState([]);

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


    /*Funcion para poder agregar productos al carrito, el nombre puede ser confuso xD*/ 
    const agregarCarrito = (prodId, cantidad) => {
        setProdCarrito((prev) => ({
            ...prev,
            [prodId]: (prev[prodId] || 0) + cantidad
        }));
    };
    /*Funcion para eliminar productos al carrito*/ 
    const eliminarCarrito = (prodId) => {
        setProdCarrito((prev) => {
            const nuevoCarrito = { ...prev };
            if (nuevoCarrito[prodId] > 1) {
                nuevoCarrito[prodId] -= 1;
            } else {
                delete nuevoCarrito[prodId];
            }
            return nuevoCarrito;
        });
    };

    const vaciarCarrito = () => {
        setProdCarrito({});
    };

    useEffect(() => {
        console.log(prodCarrito)
    }, [prodCarrito])

    const obtenerTotal = () => {
        let montoTotal = 0;
        for (const prodItem in prodCarrito) {
            if (prodCarrito[prodItem] > 0) {
                const prodInfo = lista_productos.find(
                    (producto) => producto.IDPRODUCTO === parseInt(prodItem)
                );
                if (prodInfo) {
                    montoTotal += prodInfo.PRECIOUNITARIO * prodCarrito[prodItem];
                }
            }
        }
        return montoTotal;
    }

    const valorContext = {
        lista_productos,
        prodCarrito,
        setProdCarrito,
        agregarCarrito,
        eliminarCarrito,
        obtenerTotal,
        vaciarCarrito
    };

    return (
        <ProdStoreCtx.Provider value={valorContext}>
            {props.children}
        </ProdStoreCtx.Provider>
    );
};
